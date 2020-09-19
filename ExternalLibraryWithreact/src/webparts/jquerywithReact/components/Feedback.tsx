import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './JquerywithReact.module.scss';
import * as $ from 'jquery';

require('tooltipster');
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";

import { IItemAddResult } from "@pnp/sp/items";

require('../../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../../../node_modules/tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-punk.min.css');
require('../../../../node_modules/tooltipster/dist/css/tooltipster.bundle.min.css');

interface MyProps {
}

interface MyState {
  ExcellentComment: string;
  GoodComment: string;
  MediumComment: string;
  PoorComment: string;
  MyEmail: string;
}

export default class Feedback extends React.Component<MyProps, MyState>{
  constructor(props) {
    super(props);
    this.state = {
      ExcellentComment: "",
      GoodComment: "",
      MediumComment: "",
      PoorComment: "",
      MyEmail: ""
    };
  }

  private $node;
  private $ttInstance;

  private hideStyle = {
    display: 'none'
  };

  private btnSubmitStyle = {
    cursor: 'pointer'
  };


protected handleExcellentChanged(event){
  this.setState({ExcellentComment:event.target.value});
}

protected addExcellentComment = (event) =>{
  sp.web.lists.getByTitle("spfxFeedback").items.add({
    Comment: this.state.ExcellentComment,
    FeedbackType:"Excellent",
    Title: this.state.MyEmail
  }).then((iar:IItemAddResult)=>{
    console.log(iar.data.ID);
  });
  $(this.refs.ttFeedback1).trigger("click");
  this.setState({ExcellentComment:""});
  event.preventDefault();
}


protected handleGoodChanged(event){
  this.setState({GoodComment:event.target.value});
}

protected addGoodComment = (event) =>{
  sp.web.lists.getByTitle("spfxFeedback").items.add({
    Comment: this.state.GoodComment,
    FeedbackType:"Good",
    Title: this.state.MyEmail
  }).then((iar:IItemAddResult)=>{
    console.log(iar);
  });
  $(this.refs.ttFeedback2).trigger("click");
  this.setState({GoodComment:""});
  event.preventDefault();
}

protected handleMediumChanged(event){
  this.setState({MediumComment:event.target.value});
}

protected addMediumComment = (event) =>{
  sp.web.lists.getByTitle("spfxFeedback").items.add({
    Comment: this.state.MediumComment,
    FeedbackType:"Average",
    Title: this.state.MyEmail
  }).then((iar:IItemAddResult)=>{
    console.log(iar);
  });
  $(this.refs.ttFeedback3).trigger("click");
  this.setState({MediumComment:""});
  event.preventDefault();
}

protected handlePoorChanged(event){
  this.setState({PoorComment:event.target.value});
}

protected addPoorComment = (event) =>{
  sp.web.lists.getByTitle("spfxFeedback").items.add({
    Comment: this.state.PoorComment,
    FeedbackType:"Poor",
    Title: this.state.MyEmail
  }).then((iar:IItemAddResult)=>{
    console.log(iar);
  });
  $(this.refs.ttFeedback4).trigger("click");
  this.setState({PoorComment:""});
  event.preventDefault();
}


  public componentDidMount(){
    this.$node = $(this.refs.ttContainer);
    this.$ttInstance = this.$node.children().tooltipster({
        animation: 'grow',
        delay:200,
        theme:'tootipster-punk',
        trigger:'click',
        maxWidth: 500,
        minWidth: 500,
        interactive:true
    });

    sp.web.currentUser.get().then((user) => {
      this.setState({MyEmail: user.Email});
    });
  }



  public render() {
    return (<div>
      <ul className="nav justify-content-center" ref="ttContainer">
        <li ref="ttFeedback1" data-tooltip-content="#tooltip_content1" className="nav-item">
          <a className="nav-link tt-tip" href="#">Excellent</a>
        </li>
        <li ref="ttFeedback2" data-tooltip-content="#tooltip_content2" className="nav-item">
          <a className="nav-link tt-tip" href="#">Good</a>
        </li>
        <li ref="ttFeedback3" data-tooltip-content="#tooltip_content3" className="nav-item">
          <a className="nav-link tt-tip" href="#">Medium</a>
        </li>
        <li ref="ttFeedback4" data-tooltip-content="#tooltip_content4" className="nav-item">
          <a className="nav-link tt-tip" href="#">Poor</a>
        </li>
      </ul>

      <div style={this.hideStyle} className={styles.tootipTemplates}>
        <div id="tooltip_content1">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="comment1">Comment:</label>
                <textarea value={this.state.ExcellentComment}
                onChange={(event)  => this.handleExcellentChanged(event)} ref="comment1Ref" className="form-control" rows={10} id="comment1"/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6 text-right" >
              <div style={this.btnSubmitStyle} onClick={this.addExcellentComment} className="btnSubmit btnHappy btn btn-sucess">Submit</div>
            </div>
          </div>
        </div>

        <div id="tooltip_content2">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="comment2">Comment:</label>
                <textarea value={this.state.GoodComment}
                onChange={(event)  => this.handleGoodChanged(event)} ref="comment1Ref" className="form-control" rows={10} id="comment2"/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6 text-right" >
              <div style={this.btnSubmitStyle} onClick={this.addGoodComment} className="btnSubmit btnHappy btn btn-sucess">Submit</div>
            </div>
          </div>
        </div>

        <div id="tooltip_content3">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="comment3">Comment:</label>
                <textarea value={this.state.MediumComment}
                onChange={(event)  => this.handleMediumChanged(event)} ref="comment1Ref" className="form-control" rows={10} id="comment3"/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6 text-right" >
              <div style={this.btnSubmitStyle} onClick={this.addMediumComment} className="btnSubmit btnHappy btn btn-sucess">Submit</div>
            </div>
          </div>
        </div>

        <div id="tooltip_content4">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="comment4">Comment:</label>
                <textarea value={this.state.PoorComment}
                onChange={(event)  => this.handlePoorChanged(event)} ref="comment1Ref" className="form-control" rows={10} id="comment4"/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6 text-right" >
              <div style={this.btnSubmitStyle} onClick={this.addPoorComment} className="btnSubmit btnHappy btn btn-sucess">Submit</div>
            </div>
          </div>
        </div>

      </div>
    </div>
      );
  }
}
