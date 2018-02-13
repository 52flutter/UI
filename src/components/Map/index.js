import React,{PropTypes} from 'react'
import {connect} from 'dva'
import { Upload,Icon,Button,Select,Row,Col,Form,Input,Modal } from 'antd'
import ModalComponent from '../Modal/index';
const Option = Select.Option;
const FormItem = Form.Item;
export class MapComponent extends React.Component{
  componentDidMount=()=> {
    document.addEventListener('mousedown',this.getDownXY)
    document.addEventListener('mouseup',this.mapUp)
    document.addEventListener('mousemove',this.mapMove)
    this.setState({
      containerX:document.getElementById('svg_container').offsetLeft,
      containerY:document.getElementById('svg_container').offsetTop,
      propMapWidth:document.getElementById('svg_container').clientWidth,
      propMapHeight:document.getElementById('svg_container').clientHeight
    })
    window.onresize=()=>{
      this.setState({
        containerX:document.getElementById('svg_container').offsetLeft,
        containerY:document.getElementById('svg_container').offsetTop,
        propMapWidth:document.getElementById('svg_container').clientWidth,
        propMapHeight:document.getElementById('svg_container').clientHeight
      })
    }
  }
  componentWillUnmount=()=> {
    window.onresize=''
    document.removeEventListener('mousedown',this.getDownXY)
    document.removeEventListener('mouseup',this.mapUp)
    document.removeEventListener('mousemove',this.mapMove)
  }
  getDownXY=(event)=>{
    this.setState({
      downX:event.pageX,
      downY:event.pageY,
      containerX:document.getElementById('svg_container').offsetLeft,
      containerY:document.getElementById('svg_container').offsetTop,
      propMapWidth:document.getElementById('svg_container').clientWidth,
      propMapHeight:document.getElementById('svg_container').clientHeight
    })
  }
  componentWillMount=()=>{
    const sameObstacleArr=[{obstacleColor:'red',signalreducevalue:'70',obstacleWidth:'6',obstacleName:'WallsHeavy'},{obstacleColor:'green',signalreducevalue:'50',obstacleWidth:'5',obstacleName:'Cubicle'},{obstacleColor:'blue',signalreducevalue:'30',obstacleWidth:'4',obstacleName:'DoorHeavy'},{obstacleColor:'orange',signalreducevalue:'10',obstacleWidth:'3',obstacleName:'Glass'}]
    this.setState({
      addMapModalShow:false,propMapWidth:'1600',propMapHeight:'1000',fileName:'',obstacleData:this.props.obstacleData,
      imgWidth:this.props.imgWidth,imgHeight:this.props.imgHeight,mapUrl:this.props.mapUrl,mapName:this.props.mapName,mapScale:this.props.mapScale,
      apData:this.props.apData,/*AP坐标*/
      positionX:0,positionY:0,/*定位*/
      initialScale:this.props.initialScale,
      scale:this.props.initialScale,/*缩放*/
      drawingX1:0,drawingY1:0,drawingX2:0,drawingY2:0,drawingColor:'red',drawingWidth:'6',drawingObstacleName:'WallsHeavy',drawingSignalreducevalue:'70',/*画线初始值*/
      isDraw:false,/*画线*/
      isEdit:false,/*修改画线*/
      showAP:false,/*显示AP*/
      APDetail:false,/*显示AP详情*/
      hotMap:false,/*显示覆盖区域*/
      dragArr:[],/*能拖动的AP*/
      addAPModalShow:false,/*添加AP的模态框*/
      colorPickerShow:false,/*取色器*/
      selectedColor:"",/*取色器*/
      selectedAPGroup:'all',/*AP分组选择*/
      addMaterialShow:false,/*添加材料模态框*/
      sameObstacleArr:sameObstacleArr,
      obstacleArr:sameObstacleArr.concat(this.props.obstacleArr),/*线条*/
      editMaterialShow:false,/*修改材料模态框*/
    })
    // localStorage.apData=[{apX:100,apY:100,group:'1111111111',MAC:'34:E7:0B:00:EF:70',IP:'192.168.2.118',client:20,Status:'在线',users:'35'},{apX:100,apY:300,group:'2222222222',MAC:'34:E7:0B:02:B5:F0',IP:'192.168.2.112',client:50,Status:'在线',users:'155'},{apX:300,apY:100,group:'3333333333',MAC:'34:E7:0B:02:D0:10',IP:'192.168.2.119',client:150,Status:'在线',users:'999'}];
  }
  addMapModal=()=>{
    this.setState({
      addMapModalShow:true,
    })
  }
  closeMapModal=()=>{
    this.props.form.resetFields()
    this.setState({
      addMapModalShow:false,
      fileUrl:'',fileName:''
    })
  }
  addMap=()=>{
    this.props.form.validateFields(['mapName','mapScale','fileName'],(err, values) => {
      if (!err) {
        if(this.state.iHeight>this.state.propMapHeight){
          this.setState({
            initialScale:Math.floor(this.state.propMapHeight/this.state.iHeight*10)/10,
            scale:Math.floor(this.state.propMapHeight/this.state.iHeight*10)/10,
          })
          this.props.setInitialScale(Math.floor(this.state.propMapHeight/this.state.iHeight*10)/10)
        }else {
          this.setState({
            initialScale:1,
            scale:1,
          })
          this.props.setInitialScale(1)
        }
        this.props.setMap(this.state.iWidth,this.state.iHeight,this.state.fileUrl,values.mapName,values.mapScale)
        this.setState({
          mapUrl:this.state.fileUrl,imgWidth:this.state.iWidth,imgHeight:this.state.iHeight,mapName:values.mapName,mapScale:values.mapScale,
          addMapModalShow:false,fileUrl:'',fileName:'',iWidth:undefined,iHeight:undefined,
          obstacleData:[],obstacleArr:this.state.sameObstacleArr,apData:[],
        })
        this.props.form.resetFields()
      }
    });
  }
  /*上传转base64*/
  handleChange=(info)=>{
    if(info.file.status==='done') {
      this.setState({fileName:info.file.name})
      const reader=new FileReader()
      reader.onload=()=>{this.setState({fileUrl:reader.result})}
      reader.readAsDataURL(info.file)
    }
  }
  beforeUpload=(file)=>{
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = ()=>{
      let image = new Image()
      image.src= reader.result
      image.onload=()=>{
        this.setState({
          fileUrl:reader.result,
          fileName:file.name,
          iWidth:image.width,
          iHeight:image.height,
        })
        // if(image.height>this.state.propMapHeight){
        //   this.setState({
        //     initialScale:Math.floor(this.state.propMapHeight/image.height*10)/10,
        //     scale:Math.floor(this.state.propMapHeight/image.height*10)/10,
        //   })
        // }
        // if(image.width>this.state.propMapWidth||image.height>this.state.propMapHeight){
        //   this.setState({
        //     initialScale:Math.floor(image.width/image.height>this.state.propMapWidth/this.state.propMapHeight?this.state.propMapWidth/image.width*10:this.state.propMapHeight/image.height*10)/10,
        //     scale:Math.floor(image.width/image.height>this.state.propMapWidth/this.state.propMapHeight?this.state.propMapWidth/image.width*10:this.state.propMapHeight/image.height*10)/10,
        //   })
        // }
      }
    }
  }
  /*覆盖上传===================================*/
  updateSet=(file, fileList)=>{
    return false
  }
  /*删除地图*/
  deleteMapModal=()=>{
    let that=this
    Modal.confirm({
      content: '删除后不可恢复，是否确认删除',
      okText: '确认',
      cancelText: '取消',
      onOk:()=>{
        this.props.deleteMap()
        that.setState({
          obstacleData:[],
          apData:[],
          mapUrl:'',imgWidth:'',imgHeight:'',mapName:'',mapScale:0,initialScale:1,
        })
      }
    })
  }
  /*鼠标滚动*/
  mouseWheel=(event)=>{
    event.preventDefault()
    let X = event.pageX-event.currentTarget.offsetLeft,Y = event.pageY-event.currentTarget.offsetTop/*,xx=this.state.propMapWidth/2*this.state.scale,yy=this.state.propMapHeight/2*this.state.scale*/
      event.deltaY<0?
        this.state.scale<3?
          this.setState({scale:(this.state.scale*10+1)/10}):'':
        this.state.scale>this.state.initialScale?
          this.setState({scale:(this.state.scale*10-1)/10}):''
      event.deltaY<0&&this.state.scale<3?
        this.setState({
          positionX:Math.floor((this.state.positionX-X)/this.state.scale*(this.state.scale*10+1)/10+X),
          positionY:Math.floor((this.state.positionY-Y)/this.state.scale*(this.state.scale*10+1)/10+Y),
          // positionX:Math.floor(((this.state.positionX-X)/this.state.scale*(this.state.scale+0.1)+X)<=-xx?-xx:((this.state.positionX-X)/this.state.scale*(this.state.scale+0.1)+X)>=this.state.propMapWidth-xx?this.state.propMapWidth-xx:((this.state.positionX-X)/this.state.scale*(this.state.scale+0.1)+X)),
          // positionY:Math.floor(((this.state.positionY-Y)/this.state.scale*(this.state.scale+0.1)+Y)<=-yy?-yy:((this.state.positionY-Y)/this.state.scale*(this.state.scale+0.1)+Y)>=this.state.propMapHeight-yy?this.state.propMapHeight-yy:((this.state.positionY-Y)/this.state.scale*(this.state.scale+0.1)+Y)),
        }):
        event.deltaY>0&&this.state.scale>this.state.initialScale?
        this.setState({
          positionX:Math.floor(this.state.positionX-this.state.positionX/(this.state.scale*10-this.state.initialScale*10)),
          positionY:Math.floor(this.state.positionY-this.state.positionY/(this.state.scale*10-this.state.initialScale*10))
        }):''
        // event.deltaY>0&&this.state.scale>this.state.initialScale?
        // this.setState({
        //   positionX:((this.state.positionX-X)/this.state.scale*(this.state.scale-0.1)+X)<=-xx?-xx:((this.state.positionX-X)/this.state.scale*(this.state.scale-0.1)+X)>=this.state.propMapWidth-xx?this.state.propMapWidth-xx:((this.state.positionX-X)/this.state.scale*(this.state.scale-0.1)+X),
        //   positionY:((this.state.positionY-Y)/this.state.scale*(this.state.scale-0.1)+Y)<=-yy?-yy:((this.state.positionY-Y)/this.state.scale*(this.state.scale-0.1)+Y)>=this.state.propMapHeight-yy?this.state.propMapHeight-yy:((this.state.positionY-Y)/this.state.scale*(this.state.scale-0.1)+Y),
        // }):''
  }
  /*绘制障碍*/
  changeDraw=()=>{
    this.setState({
      isDraw:!this.state.isDraw,cx1:undefined,cy1:undefined,cx2:undefined,cy2:undefined,editColor:undefined,isEdit:false
    })
  }
  /*操作地图*/
  mapDown=(event)=>{
    event.preventDefault()
    /*画线--------------------------------*/
    if(this.state.isDraw&&!this.state.isEdit){
      this.setState({
        edited:true,
        drawingX1:(event.pageX-event.currentTarget.offsetLeft-this.state.positionX)/this.state.scale,
        drawingY1:(event.pageY-event.currentTarget.offsetTop-this.state.positionY)/this.state.scale,
        drawingX2:(event.pageX-event.currentTarget.offsetLeft-this.state.positionX)/this.state.scale,
        drawingY2:(event.pageY-event.currentTarget.offsetTop-this.state.positionY)/this.state.scale
      })
    }else
    /*地图拖动----------------------------------*/
    if(this.state.obstacleInd===undefined&&this.state.APMAC===undefined&&this.state.scale!=this.state.initialScale){
      this.setState({
        positionXX:Math.floor(this.state.positionX),
        positionYY:Math.floor(this.state.positionY),
      })
    }
  }
  mapMove=(event)=>{
    let X=event.pageX>=this.state.containerX+this.state.propMapWidth?this.state.containerX+this.state.propMapWidth:event.pageX<=this.state.containerX?this.state.containerX:event.pageX,
      Y=event.pageY>=this.state.containerY+this.state.propMapHeight?this.state.containerY+this.state.propMapHeight:event.pageY<=this.state.containerY?this.state.containerY:event.pageY
    /*画线----------------------------------*/
    if(this.state.edited!==undefined){
      this.setState({
        drawingX2:(X-this.state.containerX-this.state.positionX)/this.state.scale,
        drawingY2:(Y-this.state.containerY-this.state.positionY)/this.state.scale,
      })
    }
    /*地图拖动-----------------------------*/
    if(this.state.positionXX!==undefined&&this.state.obstacleInd===undefined&&this.state.APMAC===undefined){
      let px=this.state.positionXX+event.pageX-this.state.downX,py=this.state.positionYY+event.pageY-this.state.downY,
        xx=2000*(this.state.scale*10)/10,yy=this.state.propMapHeight*(this.state.scale*10-this.state.initialScale*10)/(this.state.initialScale*10)
      this.setState({
        positionX:px<=-xx?-xx:px>=0?0:px,
        positionY:py<=-yy?-yy:py>=0?0:py,
      })
    }
    /*circleMove1---------------------------*/
    if(this.state.cx11!==undefined){
      let cx1=this.state.cx11+(X-this.state.downX)/this.state.scale,cy1=this.state.cy11+(Y-this.state.downY)/this.state.scale
      this.state.obstacleData[this.state.obstacleInd]={xOne:cx1,yOne:cy1,xTwo:this.state.cx2,yTwo:this.state.cy2,color:this.state.editColor,width:this.state.editWidth,obstacleName:this.state.drawingObstacleName,signalreducevalue:this.state.drawingSignalreducevalue}
      this.props.setObstacleData(this.state.obstacleData)
      this.setState({
        cx1:cx1,cy1:cy1,obstacleData:this.state.obstacleData,
      })
    }
    /*circleMove2--------------------------*/
    if(this.state.cx22!==undefined){
      let cx2=this.state.cx22+(X-this.state.downX)/this.state.scale,cy2=this.state.cy22+(Y-this.state.downY)/this.state.scale
      this.state.obstacleData[this.state.obstacleInd]={xOne:this.state.cx1,yOne:this.state.cy1,xTwo:cx2,yTwo:cy2,color:this.state.editColor,width:this.state.editWidth,obstacleName:this.state.drawingObstacleName,signalreducevalue:this.state.drawingSignalreducevalue}
      this.props.setObstacleData(this.state.obstacleData)
      this.setState({
        cx2:cx2,cy2:cy2,obstacleData:this.state.obstacleData,
      })
    }
    /*AP拖动*/
    if(this.state.APMAC!==undefined){
      let AX=event.pageX>=this.state.containerX+this.state.propMapWidth-50?this.state.containerX+this.state.propMapWidth-50:event.pageX<=this.state.containerX+50?this.state.containerX+50:event.pageX,
        AY=event.pageY>=this.state.containerY+this.state.propMapHeight-50?this.state.containerY+this.state.propMapHeight-50:event.pageY<=this.state.containerY+50?this.state.containerY+50:event.pageY
      this.state.apData.forEach((val,ind)=>{
        if(val.MAC===this.state.APMAC){
          this.state.apData[ind].apX=(this.state.APX+AX-this.state.downX-this.state.positionX)/this.state.scale
          this.state.apData[ind].apY=(this.state.APY+AY-this.state.downY-this.state.positionY)/this.state.scale
        }
      })
      this.props.setApData(this.state.apData)
      this.setState({
        apData:this.state.apData,
      })
    }
  }
  mapUp=()=>{
    /*画线--------------------------------*/
    if(this.state.edited!==undefined){
      if(this.state.drawingX1!==this.state.drawingX2||this.state.drawingY1!==this.state.drawingY2){
        this.props.setObstacleData(this.state.obstacleData.concat([{xOne:this.state.drawingX1,yOne:this.state.drawingY1,xTwo:this.state.drawingX2,yTwo:this.state.drawingY2,color:this.state.drawingColor,width:this.state.drawingWidth,obstacleName:this.state.drawingObstacleName,signalreducevalue:this.state.drawingSignalreducevalue}]))
        this.setState({
          obstacleData:this.state.obstacleData.concat([{xOne:this.state.drawingX1,yOne:this.state.drawingY1,xTwo:this.state.drawingX2,yTwo:this.state.drawingY2,color:this.state.drawingColor,width:this.state.drawingWidth,obstacleName:this.state.drawingObstacleName,signalreducevalue:this.state.drawingSignalreducevalue}]),
        })
      }
      this.setState({
        edited:undefined,
        drawingX1:0,
        drawingY1:0,
        drawingX2:0,
        drawingY2:0
      })
    }
      /*地图拖动----------------------------------*/
    if(this.state.positionXX!==undefined){
      this.setState({
        positionXX:undefined,
        positionYY:undefined,
      })
    }
    /*circleUp---------------------------------*/
    if(this.state.cx11!==undefined||this.state.cx22!==undefined){
      this.setState({
        cx11:undefined,cy11:undefined,cx22:undefined,cy22:undefined,obstacleInd:undefined,cx1:undefined,cy1:undefined,cx2:undefined,cy2:undefined,editColor:undefined,editWidth:undefined,editObstacleName:undefined,editSignalreducevalue:undefined
      })
    }
    /*AP拖动*/
    if(this.state.APMAC!==undefined){
      this.setState({
        APMAC:undefined,APX:undefined,APY:undefined
      })
    }
    this.setState({
      downX:undefined,
      downY:undefined,
    })
  }
  /*修改障碍*/
  editObstacle=(event)=>{
    if(this.state.isDraw&&this.state.isEdit){
      let cx1=event.currentTarget.x1.baseVal.value,cy1=event.currentTarget.y1.baseVal.value,cx2=event.currentTarget.x2.baseVal.value,cy2=event.currentTarget.y2.baseVal.value,editColor=event.currentTarget.style.stroke,
        editWidth=event.currentTarget.style.strokeWidth,obstacleIndex=event.target.getAttribute("data-obstacleIndex"),editObstacleName=event.target.getAttribute("data-obstacleName"),editSignalreducevalue=event.target.getAttribute("data-signalreducevalue")
      this.setState({
        cx1:cx1,cy1:cy1,cx2:cx2,cy2:cy2,editColor:editColor,editWidth:editWidth,obstacleInd:obstacleIndex,editObstacleName:editObstacleName,editSignalreducevalue:editSignalreducevalue,
      })
    }
  }
  changeIsEdit =()=>{
    this.setState({
      isEdit:!this.state.isEdit,obstacleInd:undefined,cx1:undefined,cy1:undefined,cx2:undefined,cy2:undefined,editColor:undefined,editWidth:undefined,editObstacleName:undefined,editSignalreducevalue:undefined
    })
  }
  deleteObstacle =()=>{
    this.state.obstacleInd?this.state.obstacleData.splice(this.state.obstacleInd,1):''
    this.props.setObstacleData(this.state.obstacleData)
    this.setState({
      obstacleData:this.state.obstacleData,obstacleInd:undefined,cx1:undefined,cy1:undefined,cx2:undefined,cy2:undefined,editColor:undefined,editWidth:undefined,editObstacleName:undefined,editSignalreducevalue:undefined
    })
  }
  obstacleChoose =(value)=>{
    this.state.obstacleArr.forEach((val,ind)=>{
      if(value===val.obstacleColor){
        this.setState({
          drawingColor:value,
          drawingWidth:val.obstacleWidth,
          drawingObstacleName:val.obstacleName,
          drawingSignalreducevalue:val.signalreducevalue,
        })
      }
    })
  }
  /*拖动线条*/
  circleDown1=(event)=>{
    this.setState({
      cx11:this.state.cx1,cy11:this.state.cy1,
    })
  }
  circleDown2 =()=>{
    this.setState({
      cx22:this.state.cx2,cy22:this.state.cy2,
    })
  }
  /*显示AP*/
  showAP=()=>{
    this.setState({
      showAP:!this.state.showAP,
      dragArr:[],
      selectedAPGroup:'all',
      APDetail:false,
      hotMap:false,
    })
  }
  apDown=(event)=>{
    let APX=event.currentTarget.x.baseVal.value,APY=event.currentTarget.y.baseVal.value,imgMAC=event.target.getAttribute("data-imgMAC")
    if(this.checkIsDrag(imgMAC)){
      this.setState({
        APX:APX,APY:APY,APMAC:imgMAC
      })
    }
  }
  addAPModalShow=()=>{
    this.setState({
      addAPModalShow:true,
    })
  }
  closeAPModal=()=>{
    this.props.form.resetFields()
    this.setState({
      addAPModalShow:false,
    })
  }
  addAP=()=>{
    this.props.form.validateFields(['MAC','IP','group'],(err, values) => {
      let isbe=true
      this.state.apData.forEach((val)=>{
        if(val.MAC===values.MAC){
          isbe=false
        }
      })
      if (!err&&isbe) {
        this.props.setApData(this.state.apData.concat([{apX:50,apY:50,group:values.group,MAC:values.MAC,IP:values.IP,client:0,Status:'在线',users:0}]))
        this.setState({
          apData:this.state.apData.concat([{apX:50,apY:50,group:values.group,MAC:values.MAC,IP:values.IP,client:0,Status:'在线',users:0}]),
          addAPModalShow:false,
        })
        this.props.form.resetFields()
      }
    });
  }
  deleteAP=(event)=>{
    let MAC=event.target.getAttribute("data-circleMAC")
    this.state.apData.forEach((val,ind)=>{
      if(val.MAC===MAC){
        this.state.apData.splice(ind,1)
        this.props.setApData(this.state.apData)
        this.setState({
          apData:this.state.apData,
        })
      }
    })
  }
  /*AP单个拖动*/
  changeDrag=(event)=>{
    let circleMAC=event.target.getAttribute("data-circleMAC")
    if(this.state.dragArr.indexOf(circleMAC)===-1){
      this.state.dragArr.push(circleMAC)
      this.setState({dragArr:this.state.dragArr})
    }else {
      this.state.dragArr.splice(this.state.dragArr.indexOf(circleMAC),1)
      this.setState({dragArr:this.state.dragArr})
    }
  }
  checkIsDrag=(val)=>{
    return this.state.dragArr.indexOf(val)===-1?false:true
  }
  /*显示AP详情*/
  APDetail=()=>{
    this.setState({
      APDetail:!this.state.APDetail
    })
  }
  chooseAPGroup=(value)=>{
    this.setState({
      selectedAPGroup:value,
      dragArr:[],
    })
  }
  /*热图*/
  hotMap=()=>{
    this.setState({
      hotMap:!this.state.hotMap
    })
  }
  /*取色*/
  selectedColor=(value)=>{
    this.setState({
      selectedColor:value
    })
  }
  colorPickerShow=()=>{
    this.setState({
      colorPickerShow:!this.state.colorPickerShow
    })
  }
  closeColorPicker=()=>{
    this.setState({
      colorPickerShow:false
    })
  }
  addMaterialShow=()=>{
    this.setState({
      addMaterialShow:!this.state.addMaterialShow,
      editMaterialShow:!this.state.editMaterialShow,
      colorPickerShow:false,
      selectedColor:'',
    })
    this.props.form.resetFields()
  }
  addMaterial=()=>{
    this.props.form.validateFields(['signalreducevalue','obstacleWidth','obstacleName'],(err, values) => {
      if(!err&&this.state.selectedColor!==''){
        this.props.setObstacleArr([Object.assign({},values,{obstacleColor:this.state.selectedColor})])
        this.setState({
          obstacleArr:this.state.obstacleArr.concat([Object.assign({},values,{obstacleColor:this.state.selectedColor})]),
          selectedColor:'',
          addMaterialShow:false,
          colorPickerShow:false,
          editMaterialShow:!this.state.editMaterialShow
        })

        this.props.form.resetFields()
      }
    })
  }
  /*修改材料*/
  editMaterialShow=()=>{
    this.setState({
      editMaterialShow:!this.state.editMaterialShow,
    })
    this.setState({
      drawingColor:this.state.obstacleArr[0].obstacleColor,
      drawingWidth:this.state.obstacleArr[0].obstacleWidth,
      drawingObstacleName:this.state.obstacleArr[0].obstacleName,
      drawingSignalreducevalue:this.state.obstacleArr[0].signalreducevalue,
    })
  }
  /*删除材料*/
  deleteMaterial=(ind)=>{
    this.state.obstacleArr.splice(ind,1)
    this.props.deleteObstacleArr(ind)
    this.setState({
      obstacleArr:this.state.obstacleArr
    })
  }

  render=()=>{
    const props = {
      accept:"image/*",
      name:"mapImage",
      action:this.props.action,
      onChange:this.handleChange,
      showUploadList:false,
      // headers: {
      //   authorization: 'Access-Control-Allow-Origin',
      // },
      beforeUpload:this.beforeUpload,
      customRequest:this.updateSet
    }
    const formItemLayout={labelCol:{span:6},wrapperCol:{span:10}}
    const formItemLayout1={labelCol:{span:6},wrapperCol:{span:16}}
    const {getFieldDecorator}=this.props.form;

    let ColorHex = ['00','33','66','99','CC','FF'],colorTable = []
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 6; j++) {
        let colorTd = []
        for (let k = 0; k < 3; k++) {
          for (let l = 0; l < 6; l++) {
            colorTd.push(<td key={`td${i}${j}${k}${l}`} style={{width:'15px',cursor:'pointer',border:'0.5px solid black',backgroundColor:`#${ColorHex[k + i * 3]}${ColorHex[l]}${ColorHex[j]}`}} onClick={()=>{this.selectedColor(`#${ColorHex[k + i * 3]}${ColorHex[l]}${ColorHex[j]}`)}}/>)
          }
        }
        colorTable.push(<tr style={{height:'15px'}} key={`tr${i}${j}`}>{colorTd}</tr>)
      }
    }
    let getColor=<table style={{border:'1px solid black'}} cellSpacing="0"><thead><tr><td colSpan={18} style={{textAlign:'right'}}><span onClick={this.colorPickerShow} style={{paddingRight:'5px',cursor:'pointer'}}>×关闭</span></td></tr></thead><tbody>{colorTable}</tbody></table>
    const signalUnit = getFieldDecorator('signalUnit')(<div>db</div>);
    const lineUnit = getFieldDecorator('lineUnit')(<div>px</div>);
    const setScale = getFieldDecorator('setScale')(<div>1 : </div>);
    return (
      <div style={{marginTop:'30px'}}>
        <Row type="flex" justify="end">
          <div style={{lineHeight:'28px',margin:'0 10px',fontSize:'20px',fontWeight:'bold'}}>{this.state.mapName}</div>
          {
            this.props.author==='owner'?
              <span>
                <Button type='primary' size="default" onClick={this.addMapModal}>添加地图</Button>
                <Button type='primary' size="default" onClick={this.deleteMapModal}>删除地图</Button>
                <Button type='primary' size="default" disabled={this.state.showAP} onClick={this.changeDraw}>{this.state.isDraw?'暂停绘制':'绘制地图'}</Button>
              </span>:''
          }
          {
            this.state.isDraw?
              <Button type='default' size="default" disabled={this.state.obstacleData.length===0&&!this.state.isEdit} onClick={this.changeIsEdit}>{this.state.isEdit?'暂停修改':'修改地图'}</Button>:''
          }
          {
            this.state.isDraw&&this.state.isEdit?
              <Button type='default' size="default" disabled={this.state.obstacleInd===undefined} onClick={this.deleteObstacle}>删除</Button>:''
          }
          {
            this.state.isDraw&&!this.state.isEdit?
                <Select value={this.state.drawingColor} onChange={this.obstacleChoose}>
                  {
                    this.state.obstacleArr.map((val,ind)=>{
                      return <Option key={ind} value={val.obstacleColor} style={{color:`${val.obstacleColor}`}}>-{val.signalreducevalue}db</Option>
                    })
                  }
                  <Option key='more'><div onClick={this.editMaterialShow} style={{textAlign:'center',color:'blue'}}>更多</div></Option>
                </Select>:''
          }
          <Button type='primary' size="default" disabled={this.state.isDraw} onClick={this.showAP}>{this.state.showAP?'隐藏AP':'显示AP'}</Button>
          {
            this.state.showAP?
              <span>
                <Button type='default' size="default" disabled={this.state.apData.length===0} onClick={this.APDetail}>{this.state.APDetail?'关闭详情':'AP详情'}</Button>
                {
                  this.props.author==='owner'?
                     <Button type='default' size="default" onClick={this.addAPModalShow}>绑定AP</Button>:''
                }
                <Select value={this.state.selectedAPGroup} onChange={this.chooseAPGroup}>
                  <Option value="all">全部分组</Option>
                  {
                    this.props.userGroupArr.map((val,ind)=>{
                      return <Option key={ind} value={val}>{val}</Option>
                    })
                  }
                </Select>
              </span>
              :''
          }
          <Button type='primary' size="default" disabled={this.state.apData.length===0||!this.state.showAP} onClick={this.hotMap}>覆盖范围</Button>
        </Row>
        <Row>
          <div style={{width:'80px',height:'28px',margin:'4px',textAlign:'center'}}>
            <Row>
              <div>{Math.floor(this.state.mapScale/this.state.scale*100)/100} m</div>
            </Row>
            <Row>
              <div style={{width:'80px',height:'8px',borderLeft:'2px solid black',borderRight:'2px solid black',borderBottom:'4px solid black'}}/>
            </Row>
          </div>
        </Row>
        <ModalComponent title={<h2>添加地图</h2>} width={1000} visible={this.state.addMapModalShow} onCancel={this.closeMapModal} onOk={this.addMap} cancelText={'取消'} okText={'保存'} content={
          <Form>
            <FormItem {...formItemLayout} label="热图名称">
            {getFieldDecorator('mapName',{rules:[{required:true,message:'Please enter the map name'}]})(<Input autoComplete="off"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="比例尺">
              {getFieldDecorator('mapScale', {rules:[{required: true,message:'Please enter a scale'}]})(<Input autoComplete="off" placeholder="100" addonBefore={setScale}/>)}
            </FormItem>
            <FormItem {...formItemLayout1} label="图片名称">
              {getFieldDecorator('fileName',{rules:[{required: true,message:'Please select the image'}]})(
                <span>
                  <Col span={15}>
                    <div className={'fileName'} style={{cursor: 'not-allowed'}}>{this.state.fileName}</div>
                  </Col>
                  <Col span={8} offset={1}>
                    <Upload {...props}>
                      <Button type='primary' size="large">选择图片</Button>
                    </Upload>
                  </Col>
                </span>
              )}
            </FormItem>
            {
              this.state.fileUrl?
              <FormItem {...formItemLayout} label="图片预览">
                {getFieldDecorator('filePreview',{})(
                  <img src={this.state.fileUrl} className={'filePreview'}/>
                )}
              </FormItem>:''
            }
          </Form>
        }/>
        <ModalComponent title={<h2>添加AP</h2>} width={1000} visible={this.state.addAPModalShow} onCancel={this.closeAPModal} onOk={this.addAP} cancelText={'取消'} okText={'保存'} content={
          <Form>
            <FormItem {...formItemLayout} label="IP地址">
              {getFieldDecorator('IP',{rules:[{required:true,message:'Please enter the IP'}]})(<Input autoComplete="off" placeholder="192.168.1.1"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="MAC地址">
            {getFieldDecorator('MAC',{rules:[{required:true,message:'Please enter the MAC'}]})(<Input autoComplete="off" placeholder="FF:FF:FF:FF:FF:FF"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="分组">
              {getFieldDecorator('group',{rules:[{required:true,message:'Please enter the group'}],initialValue:this.props.userGroupArr[0]})(
                <Select>
                  {
                    this.props.userGroupArr.map((val,ind)=>{
                      return <Option key={ind} value={val}>{val}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Form>
        }/>
        <ModalComponent title={<h2>添加材料</h2>} width={1000} visible={this.state.addMaterialShow} onCancel={this.addMaterialShow} onOk={this.addMaterial} cancelText={'取消'} okText={'保存'} content={
          <Form>
            <FormItem {...formItemLayout} label="材料名称">
              {getFieldDecorator('obstacleName',{rules:[{required:true,message:'请输入材料名称'}]})(<Input autoComplete="off" onFocus={this.closeColorPicker}/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="信号衰减">
              {getFieldDecorator('signalreducevalue',{rules:[{required:true,message:'请输入信号衰减数值'}]})(<Input autoComplete="off" addonAfter={signalUnit} onFocus={this.closeColorPicker}/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="材料颜色">
              {getFieldDecorator('selectedColor',{rules:[{required:true,message:'请选择材料颜色'}]})(<span><div className={'fileName'} onClick={()=>{this.setState({colorPickerShow:true})}} style={{backgroundColor:`${this.state.selectedColor}`}}/>{this.state.colorPickerShow?getColor:''}</span>)}
            </FormItem>
            <FormItem {...formItemLayout} label="材料宽度">
              {getFieldDecorator('obstacleWidth',{rules:[{required:true,message:'请输入1~10的整数'}]})(<Input autoComplete="off" addonAfter={lineUnit} onFocus={this.closeColorPicker}/>)}
            </FormItem>
          </Form>
        }/>
        <ModalComponent title={<h2>修改材料</h2>} width={1000} visible={this.state.editMaterialShow} onCancel={this.editMaterialShow} onOk={this.editMaterialShow} okText='确定' content={
          <span>
            {
              this.state.obstacleArr.map((val,ind)=>{
                return <Row key={ind} style={{height:'30px',margin:'10px',lineHeight:'30px'}}>
                          <Col span={5}>
                            <h3 style={{textAlign:'right',paddingRight:'30px'}}>{val.obstacleName}：</h3>
                          </Col>
                          <Col span={10}>
                            <div style={{backgroundColor:`${val.obstacleColor}`,height:`${val.obstacleWidth}px`,marginTop:`${(30-val.obstacleWidth)/2}px`}}/>
                          </Col>
                          {
                            this.state.obstacleArr.length===ind+1?
                              <Col span={2} offset={1}>
                                <Button type='primary' size="default" onClick={this.addMaterialShow}>添加材料</Button>
                              </Col>:''
                          }
                          {
                            ind>3?
                              <Col span={1} offset={1}>
                                <Icon type="delete" onClick={()=>{this.deleteMaterial(ind)}} style={{fontSize:'20px',cursor:'pointer',lineHeight:'30px'}}/>
                              </Col>:''
                          }
                        </Row>
              })
            }
          </span>
        }/>
        <div className={'container'}>
          <div className={'svgContainer'} onWheel={this.mouseWheel} onMouseDown={this.mapDown} id="svg_container" style={{width:`${this.props.mapWidth}`,height:`${this.props.mapHeight}`}}>
            <svg width='100%' height='100%' style={{cursor:this.state.isDraw?this.state.isEdit?'default':'crosshair':'default'}}>
              <g transform={`translate(${this.state.positionX},${this.state.positionY})scale(${this.state.scale})`}>
                <image href={this.state.mapUrl} width={this.state.imgWidth} height={this.state.imgHeight}/>
                <defs>
                  <filter id="f1">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
                  </filter>
                </defs>
                <g>
                  {
                    this.state.obstacleData.map((val,ind)=>{
                      let [x1,y1,x2,y2,color,width,obstacleName,signalreducevalue]=[val.xOne,val.yOne,val.xTwo,val.yTwo,val.color,val.width,val.obstacleName,val.signalreducevalue]
                      return (
                        <line key={ind} data-obstacleIndex={ind} data-obstacleName={obstacleName} data-signalreducevalue={signalreducevalue} x1={x1} y1={y1} x2={x2} y2={y2} style={{stroke:`${color}`,strokeWidth:`${width}`,cursor:this.state.isEdit?'pointer':'default'}} onMouseDown={this.editObstacle}/>
                      )
                    })
                  }
                  {
                    !this.state.isEdit?
                    <path d={`M${this.state.drawingX1},${this.state.drawingY1}L${this.state.drawingX2},${this.state.drawingY2}`} style={{fill:'none',stroke:`${this.state.drawingColor}`,strokeWidth:`${this.state.drawingWidth}`}}/>
                    :this.state.cx1!==undefined?
                    <path d={`M${this.state.cx1},${this.state.cy1}L${this.state.cx2},${this.state.cy2}`} style={{fill:'none',stroke:`${this.state.editColor}`,strokeWidth:`${this.state.editWidth}`}}/>:''
                  }
                  {
                    this.state.cx1&&this.state.isEdit&&this.state.isDraw?
                    <g>
                      <circle cx={this.state.cx1} cy={this.state.cy1} r="5" stroke="#fff" fill="#000" style={{cursor:'pointer'}} onMouseDown={this.circleDown1}/>
                      <circle cx={this.state.cx2} cy={this.state.cy2} r="5" stroke="#fff" fill="#000" style={{cursor:'pointer'}} onMouseDown={this.circleDown2}/>
                    </g>:''
                  }
                </g>
              </g>
              {
                this.state.showAP?
                <g>
                  {
                    this.state.apData.filter((val)=>{
                      if(this.state.selectedAPGroup==='all'){return true}else {return val.group===this.state.selectedAPGroup}
                    }).map((val)=>{
                      let [x,y,group,MAC,IP,client,Status,users]=[val.apX,val.apY,val.group,val.MAC,val.IP,val.client,val.Status,val.users]
                      return (
                        <g key={MAC}>
                          <image onMouseDown={this.apDown} key={MAC} data-imgMAC={MAC} href ={'./apimg.png'}  onClick={this.clickAp} x={`${this.state.positionX+x*this.state.scale}`} y={`${this.state.positionY+y*this.state.scale}`} width='50' height='50' style={{cursor:'pointer'}}/>
                          {
                            this.props.author==='owner'?
                              <g>
                                <circle onClick={this.changeDrag} data-circleMAC={MAC} cx={`${this.state.positionX+x*this.state.scale+10}`} cy={`${this.state.positionY+y*this.state.scale-10}`} r='10' style={{fill:`${this.checkIsDrag(MAC)?'#76FC5D':'red'}`,cursor:'pointer'}}/>
                                {
                                  this.checkIsDrag(MAC)?
                                    <circle onClick={this.deleteAP} data-circleMAC={MAC} cx={`${this.state.positionX+x*this.state.scale+40}`} cy={`${this.state.positionY+y*this.state.scale-10}`} r='10' style={{fill:'red',cursor:'pointer'}}/>:''
                                }
                              </g>
                              :''
                          }
                          {
                            this.state.APDetail?
                              <g>
                                <rect x={`${this.state.positionX+x*this.state.scale-75}`} y={`${this.state.positionY+y*this.state.scale+55}`} width="200" height="60" style={{fill:'black',strokeWidth:0,stroke:'black',fillOpacity:'0.5'}} />
                                <text style={{fill:'white',fontSize:'16px'}} x={`${this.state.positionX+x*this.state.scale-75}`} y={`${this.state.positionY+y*this.state.scale+70}`}>分组：{group}</text>
                                <text style={{fill:'white',fontSize:'16px'}} x={`${this.state.positionX+x*this.state.scale-75}`} y={`${this.state.positionY+y*this.state.scale+90}`}>IP：{IP}</text>
                                <text style={{fill:'white',fontSize:'16px'}} x={`${this.state.positionX+x*this.state.scale-75}`} y={`${this.state.positionY+y*this.state.scale+110}`}>MAC：{MAC}</text>
                              </g>:
                              <g>
                                <rect x={`${this.state.positionX+x*this.state.scale-25}`} y={`${this.state.positionY+y*this.state.scale+55}`} width="100" height="60" style={{fill:'black',strokeWidth:0,stroke:'black',fillOpacity:'0.5'}} />
                                <text style={{fill:'white',fontSize:'16px'}} x={`${this.state.positionX+x*this.state.scale-25}`} y={`${this.state.positionY+y*this.state.scale+70}`}>状态：{Status}</text>
                                <text style={{fill:'white',fontSize:'16px'}} x={`${this.state.positionX+x*this.state.scale-25}`} y={`${this.state.positionY+y*this.state.scale+90}`}>终端：{client}</text>
                                <text style={{fill:'white',fontSize:'16px'}} x={`${this.state.positionX+x*this.state.scale-25}`} y={`${this.state.positionY+y*this.state.scale+110}`}>用户：{users}</text>
                              </g>
                          }
                        </g>
                      )
                    })
                  }
                </g>:''
              }
              {
                this.state.hotMap?
                  this.state.apData.filter((val)=>{
                    if(this.state.selectedAPGroup==='all'){return true}else {return val.group===this.state.selectedAPGroup}
                  }).map((val)=>{
                    let [x,y,group,MAC,IP,client,Status,users]=[val.apX,val.apY,val.group,val.MAC,val.IP,val.client,val.Status,val.users]
                    return (
                        <circle key={MAC} cx={`${this.state.positionX+x*this.state.scale+25}`} cy={`${this.state.positionY+y*this.state.scale+25}`} r={100*this.state.scale} fill="#76FC5D" filter="url(#f1)" style={{fillOpacity:'0.5'}} />
                    )
                  }):''
              }
            </svg>
          </div>
        </div>
      </div>
    )
  }
}

MapComponent.defaultProps={
  mapWidth:'100%',
  mapHeight:'1000px',
  initialScale:1,
  mapScale:0,
  obstacleArr:[],
  apData:[],
  obstacleData:[],
}

MapComponent.propTypes={
  /**
   * 可选
   *
   *map显示区域的宽
   */
  mapWidth:PropTypes.string,
  /**
   * 可选
   *
   *map显示区域的高
   */
  mapHeight:PropTypes.string,
  /**
   * 必选
   *
   *上传的地址
   */
  action:PropTypes.string.isRequired,
  /**
   * 必选
   *
   *图片的宽
   */
  imgWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  /**
   * 必选
   *
   *图片的高
   */
  imgHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  /**
   * 可选
   *
   *AP数据
   */
  apData: PropTypes.arrayOf(PropTypes.object),
  /**
   * 可选
   *
   *障碍材料
   */
  obstacleArr: PropTypes.arrayOf(PropTypes.object),
  /**
   * 可选
   *
   *障碍数据
   */
  obstacleData: PropTypes.arrayOf(PropTypes.object),
  /**
   * 可选
   *
   *初始缩放大小
   */
  initialScale: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  /**
   * 可选
   *
   *图片比例尺
   */
  mapScale: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),

}

export default connect()(Form.create()(MapComponent))
