// import React from "react";
// import { create } from "react-test-renderer";
// import Paginator from "./Paginator";


// describe("Paginator component tests", () => { //describe - для тестирования группы тестов с названием в кавычках

//    //при количестве элементов 11 мы должны увидеть только 10 спанов
//    test("pages count is 11 but should be only 10", () => {
//       const component = create(<Paginator totalItemsCount={10} pageSize={1} portionPagesSize={10} />);
//       const root = component.root;
//       let spans = root.findAllByType("span");
//       debugger
//       expect(spans.length).toBe(10);
//    });
  

//    test("if pages count is more then 10 button NEXT should be present", () => {
//       const component = create(<Paginator totalItemsCount={11} pageSize={1} portionPagesSize={10} />);
//       const root = component.root;
//       let button = root.findAllByType("button");
//       expect(button.length).toBe(1);
//    });

// })
