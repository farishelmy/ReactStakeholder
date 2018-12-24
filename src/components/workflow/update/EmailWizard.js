import React, { Component, Fragment } from 'react'
import Select from 'react-select'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setActivePage} from '../../../actions/layoutInitAction'
import {setSelDetails} from '../../../actions/workflowAction/authListWorkFlow'

import {updateActivity, setRecipients, taskEmailRecipients, setIncStakeh} from '../../../actions/workflowAction/updateActAction'

class EmailWizard extends Component {

  constructor(){
    super()
    this.state={
        task_id: null,
        emailTemp:[],
        recipients:[],
        include_assignee: null,
        include_home: null,
        include_owner: null,
        include_stakeholders: null,
        emailName: null,
        recipients: null,
        incStakeh:[],
        emailTempName: "",
        receipientDetails:"",
        email_template_id:null,
        stakeholder_fields:[]
        
    }        
}  



componentDidUpdate(prevProps){
  if(prevProps.listWrkFlw.selDetails!==this.props.listWrkFlw.selDetails){
  const {
     recipients,
     include_assignee ,
     include_home ,
     include_owner ,
     include_stakeholders,
     stakeholder_fields,
     default_assignee_name
  } = this.props.item

  const recpnts = recipients.map(itm=>({ value: itm.recipient_id, label:decodeURIComponent(itm.recipient_name)} ))
  const stakehF = stakeholder_fields.map(itm=>({ value: itm.stakeholder_field_id, label:decodeURIComponent(itm.stakeholder_field_label)} ))


    this.setState({
      default_assignee_name:default_assignee_name,
      recipients: recpnts,
      include_assignee: include_assignee,
      include_home: include_home,
      include_owner: include_owner,
      include_stakeholders: include_stakeholders,
      stakeholder_fields:stakehF
    })
    
  }
  }


handleEmailTempChange=(value)=>{
  console.log(value)
  this.setState({
    email_template_id:value,
  })
}

handleReceipientsChange=(value)=>{

   const viewSource = value.map(item =>({
    recipient_id: item.value,
    recipient_name: item.label
}))

this.props.setRecipients(viewSource)

  this.setState({
    recipients:value,
  })
}

handleIncStakehsChange=(value)=>{

  const incStake = value.map(item =>({
    stakeholder_field_id: item.value,
    stakeholder_field_label: item.label
}))

this.props.setIncStakeh(incStake)

  this.setState({
    stakeholder_fields:value,
  })
}

handleChange=(event)=>{
  // e.preventDefault()
   const target = event.target
  const inputVal =  target.type==="checkbox"?target.checked:target.value 
  const input = target.name 
  console.log(input)  

this.setState({
    [input]:inputVal,
  }) 
} 

componentDidMount() {
  const {activityDet} = this.props.workflowDetail
  const {emailObj} = this.props.workflowDetail

  const emailTemplateName = emailObj.filter(itm => itm.email_template_id === activityDet[0].email_template_id)

if (activityDet[0].email_template_id!==""){

  this.setState({
    email_template_id:[{label : emailTemplateName[0].name, value:emailTemplateName[0].email_template_id}]
        })
}

}

formSubmit=(e)=>{
    e.preventDefault()

    const {user:{bio_access_id:bId}} = this.props.session
    // const {recipients, incStakehObj} = this.props.updActReducer

    const {
      task_id,
      title,
      subject,
      instruction,
      estimated_duration,
      is_important,
      is_auto_start,
      default_assignor_id,
      default_assignor_name,
      default_assignee_id,
      default_assignee_name,
      default_supervisor_id,
      default_supervisor_name,
      default_manager_id,
      default_manager_name,
      parent_id,
      prev_task_id,
      prev_task_title,
      additional_tasks,
      next_task_id,
      next_task_title,
      is_decision,
      task_results,
      acl_id: acl_id,
      acl_entries,
      is_enable_auto_scripting,
      auto_scripting,
      stakeholder_fields,
      recipients
    } = this.props.item

    
     const { 
      email_template_id ,
     include_assignee ,
     include_home ,
     include_owner ,
     include_stakeholders,
     } = this.state


    const updateObj={
      task_id:task_id,
      title: title,
      subject: subject,
      instruction: instruction,
      estimated_duration: estimated_duration,
      is_important: is_important,
      is_auto_start: is_auto_start,
      default_assignor_id: default_assignor_id,
      default_assignor_name: default_assignor_name,
      default_assignee_id:default_assignee_id,
      default_assignee_name: default_assignee_name,
      default_supervisor_id: default_supervisor_id,
      default_supervisor_name: default_supervisor_name,
      default_manager_id: default_manager_id,
      default_manager_name: default_manager_name,
      parent_id: parent_id,
      prev_task_id: prev_task_id,
      prev_task_title: prev_task_title,
      additional_tasks: additional_tasks,
      next_task_id: next_task_id,
      next_task_title: next_task_title,
      is_decision: is_decision,
      task_results: task_results,
      acl_id: acl_id,
      acl_entries: acl_entries,

      email_template_id: email_template_id.value,
      recipients: recipients,
      include_assignee: include_assignee,
      include_home: include_home,
      include_owner: include_owner,
      include_stakeholders: include_stakeholders,
      stakeholder_fields: stakeholder_fields,
      is_enable_auto_scripting: is_enable_auto_scripting,
      auto_scripting: auto_scripting,

      bio_access_id: bId,
      action: "SAVE_TASK" 

    }   
    this.props.updateActivity(updateObj)
    console.log(updateObj)
    alert("Successful Update")

    const selDetails={
      task_id: task_id,
      action: "ITEM_DETAIL",
      bio_access_id: bId       
  }
  this.props.setSelDetails(selDetails)
console.log(this.state.stakeholder_fields)
}

setActivePage=(e)=>{
  e.preventDefault()       
  this.props.setActivePage(e.target.getAttribute('data-pagename'))
} 


  render() {

    const {
      include_assignee,
      include_home ,
      include_owner,
      include_stakeholders,
   } = this.state
   

  const {emailObj,customFieldObj} = this.props.workflowDetail
  const optionEmailTemp = emailObj.map((itm => ({ value: itm.email_template_id, label:decodeURIComponent(itm.name)})))
  const optionCstmFldStkhObj = customFieldObj.map((itm => ({ value: decodeURIComponent(itm.custom_field_id), label:decodeURIComponent(itm.custom_field_name)})))
  const { recipients, stakeholder_fields, email_template_id} = this.state

  const {stakehList} = this.props.listWrkFlw
  const stakehOptions = stakehList.map(itm=>({ value: itm.stakeholder_id, label:decodeURIComponent(itm.full_name), status: true}))

    return (
      <Fragment>
      <h1 className="h3 display text-primary text-center">Email Notification</h1>
      <form className="mt-3 mr-3 ml-3" onSubmit={this.formSubmit}>
              <div className="row justify-content-center mb-5">
                  <div className="col-xl-3 col-lg-4 col-md-4">
                      <div className="text-center">
                          <img src={require('../../../img/email.svg')} className=" img-dash" alt="emailImage" />
                      </div>
                  </div>

                  <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">
                    <div className="form-group col">
                          <label>Email Template</label>
                                <Select
                                className="basic-single"
                              onChange={this.handleEmailTempChange}
                              options={optionEmailTemp}
                              // value={email_template_id}
                              value={email_template_id==='' || email_template_id === null ? '':email_template_id}
                              isClearable
                            />
                    </div>
                 
                    <div className="form-group col">
                          <label>Recepients</label>
                                <Select
                              onChange={this.handleReceipientsChange}
                              options={stakehOptions}
                              value={recipients}
                              isMulti
                              isClearable
                            />
                    </div>

                  {/* <div className="row form-group"> */}
                    <div className="form-group col">
                        <label>
                            <input name="include_assignee" type="checkbox" onChange={this.handleChange} checked={include_assignee}/> Include Assignee
                        </label>
                    </div>

                    <div className="form-group col">
                        <label>
                            <input name="include_home" type="checkbox" onChange={this.handleChange} checked={include_home}/> Include Home
                        </label>
                    </div>

                    <div className="form-group col">
                        <label>
                            <input name="include_owner" type="checkbox" onChange={this.handleChange} checked={include_owner}/> Include Owner
                        </label>
                    </div>

                    <div className="form-group col">
                        <label>
                            <input name="include_stakeholders" type="checkbox" onChange={this.handleChange} checked={include_stakeholders}/> Include Stakeholder
                        </label>
                    </div>
                  {/* </div> */}
                  <div className="form-group col">
                  <div className={include_stakeholders===null||include_stakeholders=== false?"d-none":"autoUpdate row"}>
                      <div className="form-group col">
                        <label>Stakeholders</label>
                          <Select
                              onChange={this.handleIncStakehsChange}
                              options={optionCstmFldStkhObj}
                              value={stakeholder_fields}
                              isMulti
                              isClearable
                            />
                        </div>
                  </div>
                  </div>
                  </div>
          </div> 
          <div className="">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn btn-secondary" data-pagename="listOfWorkflow" onClick={this.setActivePage}>Close</button>
                </div>
     </form>
      </Fragment>
    )
  }
}

EmailWizard.propTypes={
  session: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,  
  workflowDetail:PropTypes.object.isRequired,  
  listWrkFlw: PropTypes.object.isRequired,  
  updateActivity:PropTypes.func.isRequired,  
  updActReducer:PropTypes.object.isRequired, 
  setRecipients:PropTypes.func.isRequired,  
  taskEmailRecipients:PropTypes.func.isRequired,
  setIncStakeh:PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  setSelDetails: PropTypes.func.isRequired,
}

const mapStateToProps= state =>({
      session:state.session,
      layout:state.layout,
      workflowDetail:state.workflowDetail,
      listWrkFlw:state.listWrkFlw,
      updActReducer:state.updActReducer,
})
  
export default connect(mapStateToProps, {updateActivity, setRecipients, taskEmailRecipients, setIncStakeh, setActivePage, setSelDetails})(EmailWizard)
