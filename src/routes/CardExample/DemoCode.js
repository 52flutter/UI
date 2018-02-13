
export class Demo extends React.Component {

  closeFunction =(key)=> {
    console.log('closeFunction',key)
  }
  detailsFunction=(key)=> {
    console.log('detailsFunction',key)
  }
  render = () => {
    return (
        <CardComponent  id={'test'} title="CardComponent Demo" detailsText={'详情'} detailsFunction={this.detailsFunction} closeFunction={this.closeFunction}  >
          CardComponent Demo
        </CardComponent>
    );
  }
}
