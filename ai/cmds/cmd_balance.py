import sys
import pandas as pd
from lib.balance import traditional_balance, novelty_balance


def balance(args):
    if not args.outfile:
        print("Warning: Balancing data without an outfile is useless...")
    
    dataset = pd.read_csv(args.infile, index_col=0)

    if args.balancer_type in ['smote', 'adasyn', 'random']:
        dataset, r = traditional_balance(dataset, args.balancer_type)
        dataset["is_reliable"] = r
    else:
        dataset = novelty_balance(dataset, args.balancer_type)
    if args.outfile:
        dataset.to_csv(args.outfile)
    return dataset
