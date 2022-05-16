import { BookingResponse, Holiday, HolidayFilters } from "../types/booking";

export const filterResults = (booking: BookingResponse, filters: HolidayFilters): BookingResponse => {
  console.log(filters)
  if (filters.length === 0) {
    return booking
  }
  let filtered_results: Holiday[] = []
  const rating_filters = filters?.filter(i => i.search("RATING_") != -1).map(i => cleanRatingFilter(i))
  const facilities_filters = filters?.filter(i => i.search("FACILITY_") != -1).map(i => cleanFacilityFilter(i))
  filtered_results = booking?.holidays?.filter((holiday: Holiday) => {
      const facility_match: boolean = (facilities_filters.filter(element => holiday?.hotel?.content?.hotelFacilities.includes(element)) || []).length > 0;
      const rating_match: boolean = rating_filters.includes(holiday?.hotel?.content?.starRating)
      if (facilities_filters?.length > 0 && rating_filters?.length > 0) {
        return facility_match && rating_match
      } else if (facilities_filters?.length > 0 && rating_filters?.length == 0) {
        return facility_match
      } else if (facilities_filters?.length == 0 && rating_filters?.length > 0) {
        return rating_match
      } else {
        return false
      }
  })

  return {
    holidays: filtered_results
  }
}

export const cleanFacilityFilter = (filter: string) => {
  return filter.replace("FACILITY_", "")
}

export const cleanRatingFilter = (filter: string) => {
  return filter.replace("RATING_", "")
}