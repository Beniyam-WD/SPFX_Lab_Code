export class getPlannets {

  public listAllPlannets():string[]
  {
    const planets: any = require("./Planets.json");
    const myObjStr = JSON.stringify(planets);
    let plannetNames:string[] = [];

    JSON.parse(myObjStr, (key, value:string) => {
      if (key === 'name') {
        plannetNames.push(value);
      }
    });

    return plannetNames;
  }

  public getPlannetDetails(plannetname:string)
  {
    //alert(plannetname);
    //document.getElementById("details").innerHTML = plannetname;

    const planets: any = require("./Planets.json");
    const selectedPlanet: any = planets.filter((planet) => planet.name === plannetname)[0];
    //const myObjStr = JSON.parse(planets);
    console.log(selectedPlanet);

    let displayPlannetdetails:string = `<table border='1'>
    <tr><td colspan=2><a href=${selectedPlanet.wikiLink} target=_blank><img style="height:500px" src=${selectedPlanet.imageLink}></a></td></tr>
    <tr><td width="40%">ID</td><td width="60%">${selectedPlanet.id}</td></tr>
    <tr><td>Name</td><td>${selectedPlanet.name}</td></tr>
    <tr><td>Summary</td><td>${selectedPlanet.summary}</td></tr>
    <tr><td>Solar Orbit Years</td><td>${selectedPlanet.solarOrbitYears}</td></tr>
    <tr><td>Solar Orbit Avg Distance Km</td><td>${selectedPlanet.solarOrbitAvgDistanceKm}</td></tr>
    <tr><td>Num Satellites</td><td>${selectedPlanet.numSatellites}</td></tr>
    `;


    displayPlannetdetails += `</table>`;
    document.getElementById("details").innerHTML = displayPlannetdetails;

  }

}
