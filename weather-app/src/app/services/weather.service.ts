import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class WeatherService {

  constructor(private _http: HttpClient) {

  }

  public async getWeatherByCityAsync(cityName: string): Promise<any> {
    const appId = "&appid=130e03d85d02be51d92d93646895340b";
    const xmlMode = "&mode=xml";
    const metricUnits = "&units=metric";
    const countryCode = ",UA";
    const url = environment.weatherApiUrl + cityName + countryCode + appId + xmlMode + metricUnits;

    let xmlString =  await this._http.get(url, {responseType: "text"}).toPromise();
    return this.convertToXml(xmlString);
  }

  private convertToXml(xmlString: string): Object {
    let parser = new DOMParser();
    let xml = parser.parseFromString(xmlString, "text/xml");
    return xml;
  }
}