package com.team4.travel.object;

import java.util.List;

public interface countryMapper {
	public countryVO getOneCountry(int countryNumber);
	public List<countryVO> getCountryList();
}
