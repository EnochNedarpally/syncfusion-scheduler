import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  MonthAgenda,
  Inject,
  DragAndDrop,
  Resize,
} from "@syncfusion/ej2-react-schedule";
import "./App.css";
import { createElement, compile, extend } from '@syncfusion/ej2-base';
import { Popup } from '@syncfusion/ej2-popups'
import { Button, ButtonComponent } from '@syncfusion/ej2-react-buttons';

function App() {
  
  
  // useEffect(()=>{
  //   onActionBegin();
  // },[])
let userIconItem = null;
  const onActionBegin = (args) => {
    if (args.requestType === "toolbarItemRendering") {
      userIconItem = {
        align: "Left",
        // prefixIcon: "filter-icon",
        text: "Filter",
        cssClass: " e-icons e-filter e-schedule-user-icon",
      };
      args.items.push(userIconItem);
    }
  };

  const onActionComplete = (args) => {
    let scheduleElement =userIconItem && document.getElementById("schedule");
    if (args.requestType === "toolBarItemRendered") {
       let userIconEle =userIconItem && scheduleElement.querySelector(".e-filter") ;
      userIconEle.onclick = () => {
        profilePopup.relateTo = userIconEle;
        profilePopup.dataBind();
        if (profilePopup.element.classList.contains("e-popup-close")) {
          profilePopup.show();
        } else {
          profilePopup.hide();
        }
      };
    }
    let userContentEle = createElement("div", {
      className: "e-profile-wrapper",
    });
    scheduleElement.parentElement.appendChild(userContentEle);
    let userIconEle = scheduleElement.querySelector(".e-schedule-user-icon");
    let getDOMString = compile(
      // '<div class="profile-container"><div class="profile-image">' +
      //   '</div><div class="content-wrap"><div class="name">Filter</div>' +
      //   '<div class="destination">Product Manager</div><div class="status">' +
      //   '<div class="status-icon"></div>Online</div></div></div>'
      `<div class="filterPopup" >
      Filter Items
      </div>
       `
    );

    let output = getDOMString({});
     let profilePopup = new Popup(userContentEle, {
      content: output[0],
      relateTo: userIconEle,
      position: { X: "left", Y: "bottom" },
      collision: { X: "flip", Y: "flip" },
      targetType: "relative",
      viewPortElement: scheduleElement,
      width: 185,
      height: 80,
    });

    profilePopup.hide();
  };
  return (
    <>
    <ScheduleComponent actionBegin={onActionBegin} allowDragAndDrop={true}  actionComplete={onActionComplete} id="schedule">
      <Inject services={[Day, Week, WorkWeek, Month, Agenda, MonthAgenda,DragAndDrop,Resize]} />
    </ScheduleComponent>
    </>
  );
}

export default App;
