import unittest
from lib.add_env_data import add_columns
from test.data import points, get_df
import pandas

class TestEnvData(unittest.TestCase):
  def test_add_env_data(self):
    df = get_df(add_vicmap=True)

    df = add_columns(df)

    for (i, result) in df.iterrows():
      self.assertEqual(result["VMLITE_BUILT_UP_AREA"], points[i]["built_up"])
      self.assertAlmostEqual(result["sept2014JanMaxTemp_0"], points[i]["max_temp"], places=4)