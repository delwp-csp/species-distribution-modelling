import unittest
from lib.raster import RasterProcessor
from test.data import points, get_df
import pandas

class TestRaster(unittest.TestCase):
  def test_raster_processor(self):
    rp = RasterProcessor("../raw_dataset/sept2014JanMaxTemp/sept2014JanMaxTemp.ers")
      
    for point in points:
      self.assertAlmostEqual(rp.GetValueAt(point["vic_x"], point["vic_y"]), point["max_temp"], places=4)
