import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import { BookingResponse } from '../types/booking';
import { filterResults, cleanFacilityFilter, cleanRatingFilter } from './filter.service';

const mock_response = require('../mocks/response.mock.json');

const mock_results: BookingResponse = mock_response as unknown as BookingResponse

configure({ adapter: new Adapter })

describe('FilterService', () => {
  describe('cleanFacilityFilter', () => {
    it('should correct a filtered result name', async () => {
      expect(cleanFacilityFilter("FACILITY_test")).toBe("test")
    })

    it('should do nothing to a filtered name', async () => {
      expect(cleanFacilityFilter("test")).toBe("test")
    })
  })

  describe('cleanRatingFilter', () => {
    it('should correct a filtered result name', async () => {
      expect(cleanRatingFilter("RATING_1")).toBe("1")
    })

    it('should do nothing to a filtered name', async () => {
      expect(cleanRatingFilter("1")).toBe("1")
    })
  })

  describe('filterResults', () => {
    it('should correctly filter based on rating filters', async () => {
      const mock_filter = [
        "RATING_5"
      ]
      const results = filterResults(mock_results, mock_filter)
      expect(results.holidays).toHaveLength(5)
    })

    it('should correctly filter based on facility filters', async () => {
      const mock_filter = [
        "FACILITY_Bar"
      ]
      const results = filterResults(mock_results, mock_filter)
      expect(results.holidays).toHaveLength(13)
    })

    it('should correctly filter based on a mix of filters', async () => {
      const mock_filter = [
        "FACILITY_Bar",
        "RATING_5"
      ]
      const results = filterResults(mock_results, mock_filter)
      expect(results.holidays).toHaveLength(4)
    })
  })
})