import React from 'react';
import { Router, Route ,IndexRoute} from 'dva/router';
import DragGrdiLayoutExample from './routes/DragGrdiLayoutExample/IndexPage';
import CardExample from './routes/CardExample/Index';
import ModalExample from './routes/ModalExample/ModalExample';
import MapExample from './routes/MapExample/MapExample';
import ButtonExample from './routes/ButtonExample/ButtonExample';
import TableExample from './routes/tableExample/TableExample';
import RightBarExample from './routes/rightBarExample/RightBarExample';
import ItemSelectModalExample from './routes/ItemSelectModalExample/Index';
import TransparentMultipleModalExample from './routes/TransparentMultipleModal/TransparentMultipleModalExample';
import MainLayout from './routes/MainLayout';
export default  function({ history }) {
  return (
    <Router  history={history}>
      <Route  path="/" component={MainLayout} >
        <IndexRoute  component={CardExample}/>
        <Route path="/card" component={CardExample} />
        <Route path="/itemSelectModal" component={ItemSelectModalExample} />
        <Route path="/dragGridLayout" component={DragGrdiLayoutExample} />
        <Route path="/modal" component={ModalExample} />
        <Route path="/map" component={MapExample} />
        <Route path="/table" component={TableExample} />
        <Route path="/button" component={ButtonExample} />
        <Route path="/rightBar" component={RightBarExample} />
        <Route path="/transparentMultipleModal" component={TransparentMultipleModalExample} />
      </Route>
    </Router>
  );
}
