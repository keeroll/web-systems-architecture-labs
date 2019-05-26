import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class WeatherService {

  constructor(private _http: HttpClient) {

  }

  public async getWeatherByCity(cityName: string): Promise<any> {
    let appId = "&appid=130e03d85d02be51d92d93646895340b";
    let url = environment.weatherApiUrl + cityName + appId + "&mode=xml" + "&units=metric";

    let xmlString =  await this._http.get(url, {responseType: "text"}).toPromise();
    return this.convertToXml(xmlString);
  }

  private convertToXml(xmlString: string): Object {
    let parser = new DOMParser();
    let xml = parser.parseFromString(xmlString, "text/xml");
    return xml;
  }
}