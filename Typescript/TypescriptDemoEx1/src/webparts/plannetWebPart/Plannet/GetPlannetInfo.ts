export let employeename:string = "Jenkins";

export class getplannetinfo{

public listAllplannets(): string[]
{
  const plannet: any = require("./Plannet.json");
  let plannetNames: string[] = [];

  const myobj = JSON.stringify(plannet);

  JSON.parse(myobj,(key,value:string) => {
    if(key === 'name')
    {
      plannetNames.push(value);
    }
  });


  return plannetNames;
}

public getPlannetDetails(plannerName: string)
{
  //alert(plannerName);
  const plannets: any = require("./Plannet.json");
  const slectedplannet:any = plannets.filter((plannets)=> plannets.name === plannerName);

  let displayPlannetdetails: string = '<table border="1">';
  for(let i=0;i<slectedplannet.length;i++)
  {
    displayPlannetdetails+= '<tr><td colspan=2><a href=' + slectedplannet[i].wikiLink +' target=_blank><img style="height:500px" src=' + slectedplannet[i].imageLink + '></a></td></tr>';
    displayPlannetdetails+= '<tr><td width="40%">ID </td><td width="60%">' + slectedplannet[i].id + '</td></tr>';
    displayPlannetdetails+= '<tr><td>Name </td><td>'+ slectedplannet[i].name +'</td></tr>';
    displayPlannetdetails+= '<tr><td>Summary </td><td>' + slectedplannet[i].summary + '</td></tr>';
    displayPlannetdetails+= '<tr><td>Solar Or bit Years </td><td>' + slectedplannet[i].solarOrbitYears +'</td></tr>';
    displayPlannetdetails+= '<tr><td>Solar Or bit Avg Distance Km </td><td>' + slectedplannet[i].solarOrbitAvgDistanceKm + '</td></tr>';
    displayPlannetdetails+= '<tr><td>Num Satellites </td><td>' + slectedplannet[i].numSatellites +'</td></tr>';
  }


  displayPlannetdetails+= ' </table>';


  document.getElementById('plannetDetails').innerHTML = displayPlannetdetails;
}


}
