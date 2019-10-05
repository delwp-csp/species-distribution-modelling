const child_process = require("child_process")
const fs = require("fs")
const utils = require('./utils')
const set = require("lodash/set")

const balancers = ['smote', 'adasyn', 'random', 'lof', 'isolation_forest']
const models = ['svm']

const progressFname = `${utils.DATA_DIR}/ai_progress.json`
const progress = utils.readJSONFile(progressFname, {})

function set_progress(specieName, key, value) {
    set(progress, key, value)
    utils.writeJSONFile(progressFname, progress)
}

function get_progress(specieName) {
    return progress[specieName]
}

function run_python(specieName, args, infile, outfile) {
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
        const heading = `${specieName}-${args.join('-')}`

        const output = []

        proc.stdout.on('data', data => {
            
            console.log(data.toString().split('\n').map(s => `${heading} stdout: ${s}`).join('\n'))
            output.push(['stdout', data.toString()])
        })

        proc.stderr.on('data', data => {
            console.log(data.toString().split('\n').map(s => `${heading} stderr: ${s}`).join('\n'))
            output.push(['stderr', data.toString()])
        })

        proc.on('close', exitCode => {
            console.log(`${heading} exited with code: ${exitCode}`)
            resolve({
                output,
                outputString: output.reduce((acc, curr) => acc + '\n' + curr[1], ''),
                exitCode
            })
        })
    })
}


function process_step(specieName, previousStep, currentStep) {
    const dir = utils.getDirName(specieName)
    const file = file => dir + '/' + file + '.csv'
    return run_python(specieName, currentStep.split(' '), file(previousStep), file(currentStep.replace(' ','_')))
}
function process(specieName) {
    console.log(`Processing ${specieName}`)

    process_step(specieName, 'observations', 'preprocess').then(() => {
        balancers.map(balancer => `balance ${balancer}`).map(step => process_step(specieName, 'preprocess', step))
    })
    
}


module.exports = {
    process,
    get_progress
}