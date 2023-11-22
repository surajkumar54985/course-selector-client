import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "./card";
import "../static/css/card.css";
import SearchContext from "../context/searchContext";

const CardBox = ({ setLoader, currPage }) => {
  const [allData, setAllData] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [filterInput,setFilterInput] = useState("");

  const cardsPerPage = 21;

  // const ctx = useContext(SearchContextProvider);
  // const url = "https://nut-case.s3.amazonaws.com/coursessc.json";
  const url = "http://localhost:8000/user/courses";

  const ctx = useContext(SearchContext);

  const temp = [[]];
  const getData = () => {
    setLoader(true);
    const response = axios
      .get(url)
      .then((res) => {
        const ans = res.data;
        // setAllData(JSON.stringify(ans));
        // console.log(allData)
        for(let i in ans)
        {
            const val = {
                      College : ans[i].College,
                      Provider : ans[i].Provider,
                      cSubject : ans[i].cSubject,
                      courseName : ans[i].courseName,
                      createdAt : ans[i].createdAt,
                      pSubject : ans[i].pSubject,
                      CourseId : ans[i].courseId,
                  }
                  // temp.push(JSON.stringify(val));
                  temp.push(val);
                //   console.log(temp[i]);
        }

       setAllData(temp);
        // ans.map((item) => {
        //   console.log(item);
        // //   const val = [];
        // //   val.push(item.College);
        // //   val.push(item.Provider);
        // //   val.push(item.cSubject);
        // //   val.push(item.courseName);
        // //   val.push(item.createdAt);
        // //   val.push(item.pSubject);
        // //   val.push(item.courseId);
        //   const val = [{
        //       College : item.College,
        //       Provider : item.Provider,
        //       cSubject : item.cSubject,
        //       courseName :  item.courseName,
        //       createdAt : item.createdAt,
        //       pSubject : item.pSubject,
        //       CourseId : item.courseId,
        //   }]
        //   // const val = [
        //   //     item.College,
        //   //     item.Provider,
        //   //     item.cSubject,
        //   //     item.courseName,
        //   //     item.createdAt,
        //   //     item.pSubject,
        //   //     item.courseId
        //   // ]
        //   temp.push(val);
        // });
        // setAllData(temp);
        // console.log(allData);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
    // console.log(response)
    // return response.data;
  };

  useEffect(() => {
    getData();
  }, []);
  
  

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  // var today = new Date();
  // console.log(formatDate(today));
  // console.log(typeof(today));

  const arr1 = allData;
  //JSON.stringify(allData);
  const arr = Object.keys(allData).map((key) => {
    return [key, allData[key]];
  });
  // console.log(`arr` + arr);

  // arr.filter(arr => arr[1]["Course Name"].includes('J'));
  // console.log(filterArr.length);
  // .filter((item) => item[1]["Next Session Date"].includes(ctx.date))
  // .filter((item) => item[1]["Next Session Date"].includes(ctx.self));

  // console.log(filterArr);
  // console.log(filterArr.length);

  // let filArr = arr.filter((item) => {

  //   const data = item[1];
  //   console.log(data);
  //   // const college = data.College;
  //   // const provider = data.Provider;
  //   // const cSubject = data.cSubject;
  //   // const courseName = data.courseName;
  //   // const createdAt = data.createdAt;
  //   // const pSubject = data.pSubject;
  //   // console.log("College:",college);
  //   // console.log("Provider:",provider);
  //   // console.log("cSubject:",cSubject);
  //   // console.log("course Name:",courseName);
  //   // console.log("created  At:",createdAt);
  //   // console.log("pSubject:",pSubject);
  //   // data.includes(ctx.course);
  // })

  // console.log(filArr);

  let filterArr = arr.filter((item) => item[1].courseName).map((item)=> item);
  // let filterArr = arr
  // .filter((item) => {
  //   var nm = item[1].courseName;
  //   console.log(typeof(nm));
  // })
  // .filter((item) => formatDate(item[1].createdAt));
  // {
  //   // console.log("date"+formatDate(item[1].createdAt));
  //   ();
  // }
  // );
    // .filter((item) => {
    //   // console.log(item[1]);
    //   item[1].CourseName.includes("course1");
    // });

  // let filterArr = arr
  //   .filter((item) => item[1]["Course Name"].includes(ctx.course))
  //   .filter((item) => item[1]["Child Subject"].includes(ctx.childsub))
  //   .filter((item) => {
  //     if (ctx.self && item[1]['Next Session Date'] == "Self paced") {
  //       return item;
  //     }
  //     else if (!ctx.self) {
  //       return item;
  //       // ctx.stSelf(true);
  //     }
  //   })
  //   .filter( function(item) {
  //     const req = item[1]["Next Session Date"].toString();
  //     const date = req;
  //     const filterDate = formatDate(date.replace("nd","").replace("rd","").replace("th",""));
  //     if(filterDate==ctx.date && ctx.date!=='')
  //     {
  //       return item;
  //     }
  //     else if(ctx.date==='')
  //     {
  //       return item;
  //     }
  //   });

    // console.log(filterArr);

  return filterArr
    .slice(currPage * cardsPerPage, (currPage + 1) * cardsPerPage)
    .map((props) => {
      return (
        <div className="Card">
          <Card
            courseId={props[1]["CourseId"]}
            courseName={props[1]["courseName"]}
            pSubject={props[1]["pSubject"]}
            date={props[1]["createdAt"]}
            cSubject={props[1]["cSubject"]}
            Provider={props[1]["Provider"]}
            College={props[1]["College"]}
          />
        </div>
      );
    });
};


export default CardBox;

// {console.log((props[1]["Next Session Date"])
//         .replace("nd", "")
//         .replace("rd", "")
//         .replace("th", "")
//         .replace(" ","")
//         .replace(",","")
//         .replace(" ","")
//         .replace("Jan","01")
//         .replace("Feb","02")
//         .replace("Mar","03")
//         .replace("Apr","04")
//         .replace("May","05")
//         .replace("Jun","06")
//         .replace("Jul","07")
//         .replace("Aug","08")
//         .replace("Sep","09")
//         .replace("Oct","10")
//         .replace("Nov","11")
//         .replace("Dec","12")
//         )}

//             <Card
//                 courseId={props[1]["Course Id"]}
//                 courseName={props[1]["Course Name"]}
//                 pSubject={props[1]["Parent Subject"]}
//                 date={props[1]["Next Session Date"]}
//                 cSubject={props[1]["Child Subject"]}
//                 Provider={props[1]["Provider"]}
//                 College={props[1]["Universities/Institutions"]}
//             />

// arr.map((props) => { return(
//     <Card
//         courseId={props[1]["Course Id"]}
//         courseName={props[1]["Course Name"]}
//         pSubject={props[1]["Parent Subject"]}
//         date={props[1]["Next Session Date"]}
//         cSubject={props[1]["Child Subject"]}
//         Provider={props[1]["Provider"]}
//         College={props[1]["Universities/Institutions"]}
//     />);
// })
