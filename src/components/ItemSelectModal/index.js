/**
 * Created by yin on 2017/10/13.
 */
import React from 'react';
import {Modal  ,Icon , Row, Col,Checkbox,Input,Button } from 'antd';
import PropTypes from 'prop-types';
const Search= Input.Search
class ItemSelectModal extends React.Component {
  showModal = () => {
    this.setState({
      newKey: new Date(),
      searchValue:"",
    });
  }
  emptySearchValue=()=>{
    let unSelectedItems=this.state.unSelectedItemsNoSearch;
    this.setState({
      unSelectedItems: unSelectedItems,
      searchValue:"",
    });
  }
  hideModal = () => {
    let unSelectedItems = this.getUnSelectedItems(this.props.selectedItems,this.props.allItems)
    this.setState({
      newKey: new Date(), selectedItems: this.props.selectedItems ,unSelectedItems: unSelectedItems,
      allItems : this.props.allItems,unSelectedItemsNoSearch: unSelectedItems,
      selectedCheckedItems: [],unSelectedCheckedItems: []
    });
    this.props.hideModal();
  }
  onSave = () => {
    if(this.state.selectedItems.length!==0){
      this.props.onSave(this.state.selectedItems)
      this.setState({
        newKey: new Date()
      });
    }
  }
  getUnSelectedItems=(selectedItems,allItems)=> {
    let unSelectedItems = allItems.filter((itm, ind) => {
      let flage = true
      for (let i = 0;i < selectedItems.length; i++) {
        if (selectedItems[i].key === itm.key) {
          flage =false
          break
        }
      }
      return flage
    })
    return unSelectedItems
  }
  componentWillMount=()=> {
    let unSelectedItems = this.getUnSelectedItems(this.props.selectedItems,this.props.allItems)
    this.setState({
      selectedOriginal: this.props.selectedItems ,
      selectedItems: this.props.selectedItems ,unSelectedItems: unSelectedItems,
      allItems : this.props.allItems,newKey: new Date(),unSelectedItemsNoSearch: unSelectedItems,
      selectedCheckedItems: [],unSelectedCheckedItems: []
    });
  }
  unSelectedOnChange =(e,item) => {
    let unSelectedCheckedItems =this.state.unSelectedCheckedItems
    if (e.target.checked) {
      unSelectedCheckedItems.push(item)
    } else {
      unSelectedCheckedItems = this.state.unSelectedCheckedItems.filter(function (Item) {
        return Item.key !== item.key;
      });
    }
    this.setState({
      unSelectedCheckedItems: unSelectedCheckedItems
    });
  }
  selectedOnChange =(e,item) => {
    let selectedCheckedItems =this.state.selectedCheckedItems
    if (e.target.checked) {
      selectedCheckedItems.push(item)
    } else {
      selectedCheckedItems = this.state.selectedCheckedItems.filter(function (Item) {
        return Item.key !== item.key;
      });
    }
    this.setState({
      selectedCheckedItems: selectedCheckedItems
    });
  }
  // 将未选择的列全部添加
  addAllItems =()=> {
    if (this.state.unSelectedItems.length === 0) {
      return
    }
    let unSelectedItems = []
    let selectedItems =  this.state.selectedItems.concat(this.state.unSelectedItems)
    let that = this
    let unSelectedItemsNoSearch = this.state.unSelectedItemsNoSearch.filter(function (item) {
      let flag = true
      for (var i=0;i<that.state.unSelectedItems.length;i++) {
        if (that.state.unSelectedItems[i].key === item.key) {
          flag = false
          break
        }
      }
      return flag
    });
    this.setState({
      selectedItems: selectedItems ,unSelectedItems: unSelectedItems,unSelectedCheckedItems: [],unSelectedItemsNoSearch: unSelectedItemsNoSearch
    });
  }
  // 添加选中列
  addItems =() => {
    if (this.state.unSelectedCheckedItems.length === 0) {
      return
    } else {
      let that = this
      let  selectedItems =  this.state.selectedItems.concat(this.state.unSelectedCheckedItems)
      let unSelectedItems = this.state.unSelectedItems.filter(function (item) {
        let flag = true
        for (var i=0;i<that.state.unSelectedCheckedItems.length;i++) {
          if (that.state.unSelectedCheckedItems[i].key === item.key) {
            flag = false
            break
          }
        }
        return flag
      });

      let unSelectedItemsNoSearch = this.state.unSelectedItemsNoSearch.filter(function (item) {
        let flag = true
        for (var i=0;i<that.state.unSelectedCheckedItems.length;i++) {
          if (that.state.unSelectedCheckedItems[i].key === item.key) {
            flag = false
            break
          }
        }
        return flag
      });

      this.setState({
        selectedItems: selectedItems ,unSelectedItems: unSelectedItems,unSelectedCheckedItems: [],unSelectedItemsNoSearch: unSelectedItemsNoSearch
      });
    }
  }
  // 添加单个列
  addItem =(itm) => {
    let  unSelectedItemsNoSearch=this.state.unSelectedItemsNoSearch.filter(function (item) {
      return item.key !== itm.key;
    });
    let  unSelectedItems=this.state.unSelectedItems.filter(function (item) {
      return item.key !== itm.key;
    });
    let selectedItems =this.state.selectedItems.filter(function (item) {
      return true
    });
    selectedItems.push(itm)
    this.setState({
      selectedItems: selectedItems ,unSelectedItems: unSelectedItems,allItems : [],unSelectedItemsNoSearch: unSelectedItemsNoSearch
    });
  }
  // 移除所选列
  removeItems =() => {
    if (this.state.selectedCheckedItems.length === 0) {
      return
    } else {
      let that = this
      let  unSelectedItems =  this.state.unSelectedItems.concat(this.state.selectedCheckedItems)
      let  unSelectedItemsNoSearch=this.state.unSelectedItemsNoSearch.concat(this.state.selectedCheckedItems)
      let selectedItems = this.state.selectedItems.filter(function (item) {
        let flag = true
        for (var i=0;i<that.state.selectedCheckedItems.length;i++) {
          if (that.state.selectedCheckedItems[i].key === item.key) {
            flag = false
            break
          }
        }
        return flag
      });
      this.setState({
        selectedItems: selectedItems ,unSelectedItems: unSelectedItems,selectedCheckedItems: [],unSelectedItemsNoSearch: unSelectedItemsNoSearch
      });
    }
  }
  // 移除单个列
  removeItem =(itm) => {
    let selectedItems =this.state.selectedItems.filter(function (item) {
      return item.key !== itm.key;
    });
    //this.state.unSelectedItems.push(itm)
    let unSelectedItems = this.state.unSelectedItems.concat()
    unSelectedItems.push(itm)
    let unSelectedItemsNoSearch=this.state.unSelectedItemsNoSearch
    unSelectedItemsNoSearch.push(itm)
    this.setState({
      selectedItems: selectedItems ,unSelectedItems: unSelectedItems,allItems : [],unSelectedItemsNoSearch: unSelectedItemsNoSearch
    });
  }
  // 该方法是用于判断已选的items是否包含可以移动的,以便判断全部移动按钮是否可用
  judgeRemoveAll =(arr)=> {
    let flag = false
    for (let i=0;i<arr.length;i++) {
      if (!arr[i].static) {
        flag = true
        break
      }
    }
    return flag
  }
  // 将以选中的列全部移除
  removeAllItems =()=> {
    let removeAllItemFlag = this.judgeRemoveAll(this.state.selectedItems)
    if (this.state.selectedItems.length === 0 && !removeAllItemFlag) {
      return
    }
    let oldSelectItems =this.state.selectedItems.concat()
    let selectedItems = []
    let unSelectedItems =  this.state.unSelectedItems.concat()
    let unSelectedItemsNoSearch =  this.state.unSelectedItemsNoSearch.concat()
    // 这里需要考虑有些列不能让其移动
    for (let i=0;i<oldSelectItems.length;i++) {
      if (oldSelectItems[i].static) {
        selectedItems.push(oldSelectItems[i])
      } else {
        unSelectedItems.push(oldSelectItems[i])
        unSelectedItemsNoSearch.push(oldSelectItems[i])
      }
    }
    this.setState({
      selectedItems: selectedItems ,unSelectedItems: unSelectedItems,selectedCheckedItems: [],unSelectedItemsNoSearch: unSelectedItemsNoSearch
    });
  }

  onSearch =(e) => {
    let searchText = e.target.value.replace(/(^\s*)|(\s*$)/g, "")
    let unSelectedItems
    if (searchText !==  '') {
      unSelectedItems =this.state.unSelectedItemsNoSearch.filter(function (item) {
        if (item.title.indexOf(searchText) > -1 || item.title.indexOf(searchText.toUpperCase()) > -1 || item.title.indexOf(searchText.toLocaleLowerCase()) > -1) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      unSelectedItems =this.state.unSelectedItemsNoSearch
    }
    this.setState({
      unSelectedItems: unSelectedItems,
      searchValue:searchText,
    });
  }
  checkCheckBox =(items,item)=> {
    let flag = false
    for (var i=0;i<items.length;i++) {
      if (items[i].key === item.key) {
        flag = true
        break
      }
    }
    return flag
  }
  render = () => {
    let searchSuffix=this.state.searchValue ? <Icon type="close-circle" onClick={this.emptySearchValue} /> : null;
    return (
        <Modal width="80%" className="table-setting" key={this.state.newKey}
               maskClosable={false}
               title={<p><Icon type="setting"/>{this.props.title}</p>}
               visible={this.props.visible}
               onOk={this.onSave}
               onCancel={this.hideModal}
               okText={this.props.okText}
               cancelText={this.props.cancelText}
               footer={[
            <Button key="back"  onClick={this.hideModal}>{this.props.cancelText}</Button>,
            <Button key="submit" type="primary" disabled={this.state.selectedItems.length === 0} title={this.state.selectedItems.length === 0 ? this.props.savePrompt : ''} onClick={this.onSave}>{this.props.okText}</Button>
          ]}
        >
          <Row className="table-setting-content">
            <Col span={12}>
              <div className="table-setting-selected-header">
                <Input onChange={this.onSearch} placeholder={this.props.placeholder} suffix={searchSuffix} value={this.state.searchValue}/>
                <Button.Group>
                  <Button type="default" icon="double-right" disabled={!this.state.unSelectedItems.length > 0}
                          onClick={this.addAllItems} title={this.props.addAllItemTitle}/>
                  <Button type="default" icon="right" disabled={!this.state.unSelectedCheckedItems.length > 0}
                          onClick={this.addItems} title={this.props.addSelectedItemTitle}/>
                </Button.Group>
              </div>
              <div className="table-setting-selected-body">
                {(
                  this.state.unSelectedItems.map((itm, ind) => {
                    return (
                      <div key={ind} className={itm.static ? "table-setting-selected-item disable" : "table-setting-selected-item"}>
                        {!itm.static ? <Checkbox onChange={(e)=>this.unSelectedOnChange(e,itm)} checked={this.checkCheckBox(this.state.unSelectedCheckedItems,itm)}/> : <Checkbox onChange={(e)=>this.unSelectedOnChange(e,itm)} checked={this.checkCheckBox(this.state.unSelectedCheckedItems,itm)} disabled/>}
                        <div className="table-setting-selected-title">{itm.title}</div>
                        {!itm.static ?  <div className="table-setting-icon  table-setting-icon-default" onClick={()=>this.addItem(itm)}>
                          <Icon type="plus"/>
                        </div> :
                          <div className="table-setting-icon  table-setting-icon-default" >
                            <Icon type="plus"/>
                          </div>
                        }
                      </div>
                    )
                  })
                )}
              </div>
            </Col>
            <Col span={12}>
              <div className="table-setting-selected-header">
                <p>{this.state.selectedItems.length} {this.props.itemSelectedContent}</p>
                <Button.Group>
                  <Button type="default" icon="left" onClick={this.removeItems}
                          disabled={!this.state.selectedCheckedItems.length > 0} title={this.props.removeSelectedItemTitle}/>
                  <Button type="default" icon="double-left" onClick={this.removeAllItems}
                          disabled={!this.state.selectedItems.length > 0 || !this.judgeRemoveAll(this.state.selectedItems)} title={this.props.removeAllItemTitle}/>
                </Button.Group>
              </div>
              <div  className="table-setting-selected-body">
                {
                  this.state.selectedItems.length !== 0 ?   this.state.selectedItems.map((itm, ind) => {
                    return (
                      <div key={ind} className={itm.static ? "table-setting-selected-item disable" : "table-setting-selected-item"} >
                        {!itm.static ? <Checkbox onChange={(e)=>this.selectedOnChange(e,itm)} checked={this.checkCheckBox(this.state.selectedCheckedItems,itm)}/> : <Checkbox onChange={(e)=>this.selectedOnChange(e,itm)} checked={this.checkCheckBox(this.state.selectedCheckedItems,itm)} disabled/>}
                        <div className="table-setting-selected-title">{itm.title}</div>
                        {!itm.static ?   <div className="table-setting-icon table-setting-icon-danger" onClick={()=>this.removeItem(itm)}>
                          <Icon type="close"/>
                        </div> :   <div className="table-setting-icon table-setting-icon-danger disable" >
                          <Icon type="close"/>
                        </div>}

                      </div>
                    )
                  }) : <span className="prompt">{this.props.savePrompt}</span>
                }
              </div>
            </Col>
          </Row>
        </Modal>
    );
  }
}

ItemSelectModal.defaultProps = {
  okText: 'Save',
  cancelText: 'Cancel',
  title:"Select Columns to Show",
  placeholder:"search",
  itemSelectedContent:"item selected",
  addAllItemTitle:"add all items",
  addSelectedItemTitle:"add Selected items",
  removeAllItemTitle:"remove all items",
  removeSelectedItemTitle:"remove Selected items",
  savePrompt: 'Please select one of the least'
};

ItemSelectModal.propTypes = {
  /**
   * 必选
   *
   * 选中的Items,结构对象：{key: ',title: '}
   */
  selectedItems: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!('key' in propValue[key] && 'title' in propValue[key])) {
      return new Error(
        'Invalid prop `' + 'selectedItems' + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
        );
    }
  }).isRequired,
  /**
   * 可选
   *
   * 确认按钮文本内容
   */
  okText: PropTypes.string,
  /**
   * 可选
   *
   * 确认按钮被禁用后给予的提示信息
   */
  savePrompt: PropTypes.string,
  /**
   * 可选
   *
   * 取消按钮文本内容
   */
  cancelText: PropTypes.string,
  /**
   * 必选
   *
   * 所有的Items,结构对象：{key: ',title: '}
   */
  allItems: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!('key' in propValue[key] && 'title' in propValue[key])) {
      return new Error(
        'Invalid prop `' + 'allItems' + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  }).isRequired,
  /**
   * 必选
   *
   * 点击保存按钮，回调函数
   */
  onSave: PropTypes.func,
  /**
   * 必选
   *
   * 是否弹出模态框
   */
  visible:PropTypes.bool.isRequired,
  /**
   * 必选
   *
   * 点击取消按钮，回调函数
   */
  hideModal:PropTypes.func.isRequired,
  title:PropTypes.string.isRequired,
  placeholder:PropTypes.string.isRequired,
  itemSelectedContent:PropTypes.string.isRequired,
  addAllItemTitle:PropTypes.string,
  addSelectedItemTitle:PropTypes.string,
  removeAllItemTitle:PropTypes.string,
  removeSelectedItemTitle:PropTypes.string,
};
export default ItemSelectModal;
