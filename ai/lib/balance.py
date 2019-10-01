import sys
try: 
    import pandas as pd
    import numpy as np
    from imblearn.over_sampling import RandomOverSampler, SMOTE, ADASYN

except:
    print("Failed to load packages, make sure your conda environment is setup correctly")
    sys.exit(1)


def balance(data):

    reliable = data.is_reliable
    data = data.loc[:,['latitude', 'longitude']]

    r_data, r_reliable = RandomOverSampler().fit_resample(data, reliable)
    s_data, s_reliable = SMOTE().fit_resample(data, reliable)
    a_data, a_reliable = ADASYN().fit_resample(data,reliable)
    return {
        'random': [pd.DataFrame(r_data, columns=data.columns), r_reliable],
        'smote': [pd.DataFrame(s_data, columns=data.columns), s_reliable],
        'adasyn': [pd.DataFrame(a_data, columns=data.columns), a_reliable]
    }