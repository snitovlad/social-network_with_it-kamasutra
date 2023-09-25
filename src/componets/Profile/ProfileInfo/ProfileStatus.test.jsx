import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => { //describe - для тестирования группы тестов с названием в кавычках

   //компонента ProfileStatus через пропсы получает статус из ProfileInfo и он должен прийти в state
   test("status from props should be in the state", () => {
      const component = create(<ProfileStatus status={"it-kamasutra.com"} />);
      //получаем у компоненты конкретный экземпляр (instance) объекта
      const instance = component.getInstance(); //это  используют для классовых компонент и их внутренностей
      //берем этот instance и проверяем что у него в state в status наш текст
      expect(instance.state.status).toBe("it-kamasutra.com");
   });


   //когда мы в начале, и у нас не режим редактирования, у нас должен быть <span> и не должно быть <input>
   //ожидание значения с логическим нет. После expect() пишем .not
   test("after creation <span> should be displayed", () => {
      const component = create(<ProfileStatus status={"it-kamasutra.com"} />);
      //root возвращает объект корневого тестового экземпляра, 
      //который полезен для создания утверждений о конкретных узлах в дереве.
      const root = component.root; //это  используют для функциональных компонент и их внутренностей
      let span = root.findByType("span");
      expect(span).not.toBeNull();  //проверили, что в <span> что-то есть
   });

   //после создания <span> должен содержать верный статус it-kamasutra.com
   test("after creation <span> should be contained correct status", () => {
      const component = create(<ProfileStatus status={"it-kamasutra.com"} />);
      const root = component.root;
      let span = root.findByType("span");
      //если <span> нашелся и у него есть children и у children есть нулевой элемент которы равен "it-kamasutra.com"
      expect(span.children[0]).toBe("it-kamasutra.com");
   });


   //во время создания у нас не должно быть <input>, т.к. editMode: false то <input> не должен нарисоваться
   //Обработка ожидания ошибки. То есть предполагаем что на выходе будет ошибка. 
   //Для этого в expect передаем функцию в которой ожидается ошибочный параметр и после пишем .toThrow():
   test("after creation <input> shouldn't be displayed", () => {
      const component = create(<ProfileStatus status={"it-kamasutra.com"} />);
      const root = component.root;
      //в expect передали стрелочную функцию, а потом ожидаем, что будет ошибка  
      expect(() => {
         let input = root.findByType("input");
      }).toThrow();
   })

   //а теперь понажимаем на кнопочки (имитируем клик)
   //будем тестировать, что у нас происходит переход в editMode, и <input> будет отображаться вместо <span></span>
   test("<input> should be displeyed in editMode instead of span", () => {
      const component = create(<ProfileStatus status={"it-kamasutra.com"} />);
      const root = component.root;
      //мы нашли span
      let span = root.findByType("span");
      //чтобы перейти в режим редактирования мы должны кликнуть по <span>
      span.props.onClick();
      //если произойдет onClick(), то editMode изменится на true и должен появиться <input> вместо <span>
      //проверяем еще раз
      let input = root.findByType("input");
      //и у этого <input> в props проверяем, что value равно "it-kamasutra.com"
      expect(input.props.value).toBe("it-kamasutra.com");
   });

   //отслеживание колличества вызововов функции. 
   //В тесте можно создать выдуманный колбек, колличество вызовов которого, можно отследить. 
   test("callback should be called", () => {
      //Создание выдуманной функции: const mockCallBack = jest.fn( (передаваемые значения) => {тело функции} )
      const mockCallback = jest.fn(); 
      const component = create(<ProfileStatus status={"it-kamasutra.com"} updateStatus={mockCallback} />)
      //коллбэк updateStatus() должен быть вызван, когда будет deactivateEditMode
      //т.о. у нас есть компонента и мы говорим дай нам instance
      const instance = component.getInstance();
      //в этом объекте instance у нас есть метод deactivateEditMode
      instance.deactivateEditMode();
      //и если deactivateEditMode вызовется - должен из пропсов вызваться коллбэк updateStatus
      //и в него передадим хитрую функцию mockCallback, за которой тестовый фреймворк может следить
      //если вызовется коллбэк mockCallback - у него есть спец.свойства mock.calls (это массив всех параметров)
      expect(mockCallback.mock.calls.length).toBe(1);
   });

});