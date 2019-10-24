import unittest
from lib.vector import ProcessPoints
from test.data import points, get_df
import pandas

class TestVector(unittest.TestCase):
    def test_vector_processor(self):
        df = get_df(add_vicmap = True)
        
        results = ProcessPoints(df, "../raw_dataset/VMLITE/VMLITE_BUILT_UP_AREA.shp")
        
        for (i, result) in results.iterrows():
            self.assertEqual(result["VMLITE_BUILT_UP_AREA"], points[i]["built_up"])
