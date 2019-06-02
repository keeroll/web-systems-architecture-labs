import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { OpenWeatherApi } from "../_static/Constants";

@Injectable({
  providedIn: "root"
})
export class WeatherService {

  constructor(private _http: HttpClient) {

  }

  public async getWeatherByCityAsync(cityName: string): Promise<any> {
    const url = OpenWeatherApi.Url + 
                cityName + 
                OpenWeatherApi.UaCountryCode + 
                OpenWeatherApi.Key + 
                OpenWeatherApi.XmlResponse + 
                OpenWeatherApi.CelciusUnits;

    let xmlString =  await this._http.get(url, {responseType: "text"}).toPromise();
    return this.convertToXml(xmlString);
  }

  private convertToXml(xmlString: string): Object {
    let parser = new DOMParser();
    let xml = parser.parseFromString(xmlString, "text/xml");
    return xml;
  }
}