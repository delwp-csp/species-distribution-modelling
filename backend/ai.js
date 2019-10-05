const child_process = require("child_process")
const fs = require("fs")
const utils = require('./utils')
const set = require("lodash/set")
const flatMap = require("lodash/flatMap")

const balancers = ['smote', 'adasyn', 'random', 'lof', 'isolation_forest']
const models = [
    "nearest-neighbour",
    "linear-svm",
    "rbf-svm",
    "svm",
    "guassian",
    "decision-tree",
    "random-forest",
    "neural-net",
    "ada-boost",
    "naive-bayes",
    "qda"
]

const progressFname = `${utils.DATA_DIR}/ai_progress.json`
const progress = utils.readJSONFile(progressFname, {})

function set_progress(key, value) {
    set(progress, key, value)
    utils.writeJSONFile(progressFname, progress)
}

function get_progress(specieName) {
    const retval = progress[specieName] || {}
    return {
        ...retval,
        now: Date.now()
    }
}

function run_python(tag, args, infile, outfile) {
    return new Promise((resolve, reject) => {
        const proc = child_process.spawn(
            "python3",
            [
                "../ai/main.py",
                ...args,
                "-i", infile,
                ...(outfile ? ['-o', outfile] : []),
            ]
        )

        const output = []

        proc.stdout.on('data', data => {
            console.log(data.toString().split('\n').map(s => `${tag} stdout: ${s}`).join('\n'))
            output.push(['stdout', data.toString()])
        })

        proc.stderr.on('data', data => {
            console.log(data.toString().split('\n').map(s => `${tag} stderr: ${s}`).join('\n'))
            output.push(['stderr', data.toString()])
        })

        proc.on('close', exitCode => {
            console.log(`${tag} exited with code: ${exitCode}`)
            resolve({
                output,
                outputString: output.reduce((acc, curr) => acc + '\n' + curr[1], ''),
                exitCode
            })
        })
    })
}


function process_step(tag, args, infile, outfile) {
    set_progress(`${tag}.start`, Date.now())
    set_progress(`${tag}.status`, 'RUNNING')
    return run_python(tag, args, infile, outfile).then(data => {
        set_progress(`${tag}.end`, Date.now())
        set_progress(`${tag}.status`, data.exitCode ? 'FAILED' : 'DONE')
        set_progress(`${tag}.output`, data.output)
        if (data.exitCode) throw new Error('Python failed')
        return data
    })
}

function process(specieName) {
    console.log(`Processing ${specieName}`)

    set_progress(`${specieName}.status`, 'RUNNING')
    const dir = utils.getDirName(specieName)
    const file = file => file ? (dir + '/' + file + (file.indexOf('.') === -1 ? '.csv' : '')) : false

    process_step(`${specieName}.preprocess`, ['preprocess'], file('observations'), file('preprocess')).then(() => {
        return Promise.all(balancers.map(balancer => {
            return process_step(`${specieName}.bal.${balancer}.balance`, ['balance', balancer], file('preprocess'), file(`balance-${balancer}`)).then(({exitCode}) => {
                if (exitCode) return
                return Promise.all(models.map(model => {
                    process_step(`${specieName}.bal.${balancer}.model.${model}`, ['test_train', model, '-m', file(`${model}.model`)], file(`balance-${balancer}`)).then(data => {
                        const matches = data.outputString.match(/accuracy is ([0-9.]*)/)
                        if (matches) {
                            const accuracy = parseFloat(matches[1])
                            set_progress(`${specieName}.bal.${balancer}.model.${model}.accuracy`, accuracy)
                            set_progress(`${specieName}.accuracies.${balancer}_${model}`, accuracy)
                        }
                    })
                }))
            })
        }))
    }).then(() => {

        console.log('Finished processing ' + specieName)
        set_progress(`${specieName}.status`, 'DONE')
    })

}


module.exports = {
    process,
    get_progress
}