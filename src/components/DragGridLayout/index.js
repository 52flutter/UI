/**
 * Created by yin on 2017/10/11.
 */
import React from 'react';
import {Card} from "antd";
import ReactGridLayout from 'react-grid-layout';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import PropTypes from 'prop-types';
//import reactDocs  from 'react-docgen';
const layoutGrid= {
  lg: 4, md: 3, sm: 2, xs: 2, xxs: 2
}
class DragGridLayout extends React.Component {


  componentWillMount=()=>{
    let staticItem = []
    let layoutsCard = this.props.layoutsCard
    for (let name in layoutsCard) {
      if (layoutsCard[name].static) {
        staticItem.push(name)
      }
    }
    this.setState({
      cardArr: this.props.items,
      layouts: this.layoutsSort(this.props.items),
      staticItem: staticItem  // 该字段用于标识那些是可以拖动的
    });
  }
  componentWillReceiveProps=(nextProps)=> {
    if (nextProps.items !== this.props.items) {
      let layouts = this.layoutsSort(nextProps.items)
      this.setState({cardArr: nextProps.items,layouts: layouts,layout: layouts[this.state.containerWidth]});
    }
    if (nextProps.layoutsCard !== this.props.layoutsCard) {
      let staticItem = []
      let layoutsCard = nextProps.layoutsCard
      for (let name in layoutsCard) {
        if (layoutsCard[name].static) {
          staticItem.push(name)
        }
      }
      this.setState({
        staticItem: staticItem  // 该字段用于标识那些是可以拖动的
      });
    }
  }
  sortFunction =(obj1, obj2)=> {
    if (obj1.y < obj2.y) {
      return -1;
    } else if (obj1.y > obj2.y) {
      return 1;
    } else {
      if (obj1.x < obj2.x) {
        return -1;
      } else if (obj1.x > obj2.x) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  getSort=(layout)=> {
    let arr = []
    let layoutNew = layout.sort(this.sortFunction)
    for (let k=0;k<layoutNew.length;k++) {
      arr.push(layoutNew[k]['i'])
    }
    return arr
  }
  layoutsSortCoreAlgorithm=(arr,currnetX,currentY,nextWidth,grid)=> {
    let positionCard = {x:currnetX,y:currentY}
    if (arr.length>0) {
      // 1.将所有同一行的全部筛选出来
      var widthSum = 0
      //var gridCurrentX = 0
      for (let i=0;i<arr.length;i++) {
        if (arr[i].y === currentY) {
          widthSum = widthSum+arr[i].w
        }
      }
      if (widthSum+nextWidth >grid) {
        // 换行
        positionCard = {x:0,y:currentY+1}
      } else {
        // 不换行
        positionCard = {x:widthSum,y:currentY}
      }
    }
    return positionCard
  }
  layoutGridBreakpoin=(breakpoin,arr)=> {
    let arrBreakpoin = []
    let currnetX = 0
    let currentY = 0
    for (let j=0;j<arr.length;j++){
      if (this.props.layoutsCard[arr[j]] !== undefined ) {
        let nextWidth = this.props.layoutsCard[arr[j]][breakpoin]
        let cardPosition = this.layoutsSortCoreAlgorithm(arrBreakpoin,currnetX,currentY,nextWidth,this.props.cols[breakpoin])
        currnetX = cardPosition.x
        currentY = cardPosition.y
        arrBreakpoin.push({i: arr[j],w: nextWidth,h: this.props.layoutsCard[arr[j]].h || 1,x:cardPosition.x,y:cardPosition.y,static: this.props.layoutsCard[arr[j]].static || false})
        //arrBreakpoin.push({...this.props.layoutsCard[arr[j]],w: nextWidth,x:cardPosition.x,y:cardPosition.y})
      }
    }
    return arrBreakpoin
  }
  layoutsSort=(arr)=> {
    // 这里根据card的排序重新组装layouts
    let lgArr = this.layoutGridBreakpoin('lg',arr)
    let mdArr = this.layoutGridBreakpoin('md',arr)
    let smArr = this.layoutGridBreakpoin('sm',arr)
    let xsArr = this.layoutGridBreakpoin('xs',arr)
    let xxsArr = this.layoutGridBreakpoin('xxs',arr)
    let layoutsNew = { lg:lgArr,md:mdArr,sm:smArr,xs:xsArr,xxs:xxsArr }
    return  layoutsNew
  }
  onDragStop=(layout ,oldItem, newItem,placeholder, e, element)=> {
    let cardArr = this.getSort(layout)
    this.props.dragCallback(cardArr)
  }
  onBreakpointChange=(newBreakpoint, newCols)=> {
    this.setState({containerWidth: newBreakpoint});
  }
  onLayoutChange=(layout, layouts)=> {

  }
  render = () => {
    let ems = []
    this.props.children.map((itm, ind) => {
      if (itm !== null && this.state.cardArr.indexOf(itm.key) >-1){
        let height
        if (itm.props.style && itm.props.style.height) {
          height = itm.props.style.height
        } else {
          height = this.props.rowHeight
        }
        let itmNew = {...itm,props: {...itm.props,style: {...itm.props.style,height: height}}}
        ems.push(itmNew)
      }
    })
    return (
      <div className="drag-grid-layout" style={{position: 'relative'}}>
        <ResponsiveReactGridLayout layouts={this.state.layouts}
                                   cols={this.props.cols}
                                   verticalCompact={false}
                                   onDragStop={this.onDragStop}  layout={this.state.layout}
                                   breakpoints={this.props.breakpoints} onBreakpointChange={this.onBreakpointChange}
                                   rowHeight={this.props.rowHeight} onLayoutChange={this.onLayoutChange} margin={this.props.margin}>
          {(ems.map((itm, ind) => {
              return (
                <div className={this.state.staticItem.indexOf(itm.key) === -1 ? 'move' : ''} key={itm.key}>{itm}</div>
              )
            })
          )}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

DragGridLayout.defaultProps = {
  rowHeight: 320,
  cols: {
    lg: 4,
    md: 3,
    sm: 2,
    xs: 2,
    xxs: 2
  },
  breakpoints: {
    lg: 1600,
    md: 1200,
    sm: 992,
    xs: 768,
    xxs: 0
  },
  margin: [20,20],
};

DragGridLayout.propTypes = {
  /**
   * 可选
   *
   * 每个可拖曳区域高度
   */
  rowHeight: PropTypes.number,
  /**
   * 可选
   *
   * 设置不同的栅格时，每行被划分为几个
   */
  cols: PropTypes.shape({
    lg: PropTypes.number,
    md: PropTypes.number,
    sm: PropTypes.number,
    xs: PropTypes.number,
    xxs: PropTypes.number
  }),
  /**
   * 可选
   *
   * 响应式栅格的断点(设置不同的栅格对应的像素)
   */
  breakpoints: PropTypes.shape({
    lg: PropTypes.number,
    md: PropTypes.number,
    sm: PropTypes.number,
    xs: PropTypes.number,
    xxs: PropTypes.number
  }),
  /**
   * 可选
   *
   * 每个可拖曳区域元素的margin布局
   */
  margin: PropTypes.arrayOf(PropTypes.number),
  /**
   * 可选
   *
   * 每个可拖曳区域高度
   */
  layoutsCard: PropTypes.object.isRequired,
  /**
   * 可选
   *
   * 每个可拖曳区域高度
   */
  items: PropTypes.array.isRequired,
  /**
   * 可选
   *
   * 拖曳某个元素后的回调函数
   */
  dragCallback: PropTypes.func
};

export default DragGridLayout;
