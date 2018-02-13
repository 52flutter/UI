/**
 * Created by nl on 2017/10/16.
 */
import React from 'react';
import { connect } from 'dva';
// import MapComponent from '../../components/Map/index';
import {MapComponent} from '../../../lib/test/index';
// import {Button,Col} from "antd";
import Redemo from 'redemo';

const code = require("raw!./MapExample");
const docgen = require("!!docgen!../../components/Map/index");
const doc = `Map组件API及damo演示`

export class MapPage extends React.Component {
  componentWillMount=()=>{
    this.setState({
      imgWidth:localStorage.imgWidth,imgHeight:localStorage.imgHeight,mapUrl:localStorage.mapUrl,mapName:localStorage.mapName,mapScale:localStorage.mapScale,
      initialScale:localStorage.initialScale,obstacleArr:localStorage.obstacleArr?JSON.parse(localStorage.obstacleArr):[],
      apData:localStorage.apData?JSON.parse(localStorage.apData):[],obstacleData:localStorage.obstacleData?JSON.parse(localStorage.obstacleData):[],
      userGroupArr:['1111111','2222222','3333333']
    })
  }
  setMap=(imgWidth,imgHeight,mapUrl,mapName,mapScale)=>{
    localStorage.imgWidth=imgWidth
    localStorage.imgHeight=imgHeight
    localStorage.mapUrl=mapUrl
    localStorage.mapName=mapName
    localStorage.mapScale=mapScale
    localStorage.apData=JSON.stringify([])
    localStorage.obstacleArr=JSON.stringify([])
    localStorage.obstacleData=JSON.stringify([])
  }
  deleteMap=()=>{
    localStorage.mapUrl=''
    localStorage.imgWidth=''
    localStorage.imgHeight=''
    localStorage.mapName=''
    localStorage.mapScale=0
    localStorage.initialScale=1
    localStorage.obstacleArr=[]
    localStorage.obstacleData=[]
    localStorage.apData=[]
  }
  setObstacleData=(obstacleData)=>{
    localStorage.obstacleData=JSON.stringify(obstacleData)
  }
  setApData=(apData)=>{
    localStorage.obstacleData=JSON.stringify(apData)
  }
  setObstacleArr=(obstacleArr)=>{
    localStorage.obstacleArr=localStorage.obstacleArr?JSON.stringify(JSON.parse(localStorage.obstacleArr).concat(obstacleArr)):JSON.stringify(obstacleArr)
  }
  deleteObstacleArr=(ind)=>{
    localStorage.obstacleArr=JSON.stringify(JSON.parse(localStorage.obstacleArr).splice(ind-4,1))
  }
  setInitialScale=(initialScale)=>{
    localStorage.initialScale=initialScale
  }
  render = () => {
    return (
      <div>
        <Redemo
          style={{width: '100%'}}
          title="ModalComponent"
          docgen={docgen}
          doc={doc}
          code={code}
        >
          <a>Test</a>
        </Redemo>
        <MapComponent setMap={this.setMap} deleteMap={this.deleteMap} setObstacleData={this.setObstacleData} setApData={this.setApData} setObstacleArr={this.setObstacleArr} deleteObstacleArr={this.deleteObstacleArr} setInitialScale={this.setInitialScale} imgWidth={this.state.imgWidth} imgHeight={this.state.imgHeight} mapUrl={this.state.mapUrl} mapName={this.state.mapName} mapScale={this.state.mapScale}
                      initialScale={this.state.initialScale} obstacleArr={this.state.obstacleArr} apData={this.state.apData} userGroupArr={this.state.userGroupArr} obstacleData={this.state.obstacleData}
                      action='//jsonplaceholder.typicode.com/posts/' author="owner"/>
      </div>
    )
  }
}

export default connect()(MapPage);
