import React, { Component } from 'react';
import {Modal, Icon, Form, FormGroup, Slider, ControlLabel, HelpBlock, CheckPicker, CheckTreePicker, Input, TagPicker, SelectPicker, Rate, Button, FormControl} from 'rsuite';
import {Nav, Dropdown} from 'rsuite'
import '../../node_modules/rsuite/dist/styles/rsuite-default.css'
import { getVideos, activateVideo, resetVideoDB } from '../assets/admin_tools'
import { AuthenticateAdminPage, AuthenticateUserPage } from '../assets/auth';
import { v4 as uuidv4 } from 'uuid';
import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';







class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            library : [], 
            modalShow: false, 
            target : '',
            formData : {
                red_b: 0,
                blk_b: 0,
                description: '',
                subgroup: '',
                level: [],
                block: 0,
                focus: [],
                pain_settings: 0
            }
        }

        this.openModal = this.openModal.bind(this);
        this.HandleSubmit = this.handleSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.formChange = this.formChange.bind(this)
    }

    formChange = (value) =>{
        this.setState({formData: value})
         
    }

// --------------------- Component Mounts ---------------------- \\    
    async componentDidMount() {
   
        let library = getVideos()
                .then(response => { 
                    this.setState({library: response})                    
                    }
                )
                .catch((err) => alert(err))
            // return library
 
    }

    // -------------------- Modal Controls ---------------------- \\
    closeModal = () => {
        console.log("Closing Modal")
        this.setState({modalShow: false})
    }

    openModal = (event) => {
        console.log("Opening Modal")
        this.setState({target: event.target.value}, () => {
            this.setState({modalShow: true})
        })
    }


    handleSubmit(event) {
        const {library, modelShow, target, formData} = this.state
        event.preventDefault();
        console.log(`submitting, ${formData}`)
        let painSettings
        switch(formData.pain_settings[0]) {
            default:
                painSettings = {pregnant: false, knee_pain: false}
                break
            case 1:
                painSettings = {pregnant: true, knee_pain: true}
            
            case 2:
                painSettings = {pregnant: true, knee_pain: false}
            
            case 3:
                painSettings = {pregnant: false, knee_pain: true}

            

        }
        console.log(`pain setting = ${painSettings}`)
        var x = {
            "key": target,
            "block": formData.block, 
            "sub_group": formData.subgroup,
            "level": formData.level,
            "band_info" : {
                "red": formData.red_b, 
                "black": formData.blk_b
            },
            "pain_settings" : painSettings,
            "description" : formData.description,
            "focus" : formData.focus
            }

        console.log(x)
        activateVideo(x)
        resetVideoDB()
        let y = getVideos()
                .then(response => { 
                    this.setState({library: response})                    
                    }
                )
                .catch((err) => alert(err))

        this.closeModal()
      }

    

      

    render() {
        
        
        var lib = this.state.library
        var lib = this.state.library
        let list = lib.map(element => 
            (<button key={element.key} className="admin-video-element" id={element._id} name='target' value={element.key} onClick={this.openModal} style={element.is_inDB ? {backgroundColor: 'green'} : {backgroundColor: 'grey'}}>
                {element.key}
            </button>)
        )

        

        
        var square = <Icon icon='square-o' />
        return (
            <div className="AdminDashboard">
                
                <div>
                <Nav appearance="tabs" justified>
                    <Nav.Item icon={<Icon icon="home" />}  >Home</Nav.Item>
                    <Nav.Item active>Active Videos</Nav.Item>
                    <Nav.Item>(Analytics)</Nav.Item>
                    <Nav.Item>(Streaming)</Nav.Item>
                    <Nav.Item>(Contact)</Nav.Item>
                </Nav>
                </div>
            

                <Modal show={this.state.modalShow} onHide={this.closeModal}>
                    <Modal.Header>
                        <Modal.Title>Preferences for, <span style={{"color":"green", "fontSize": "20px"}}>{this.state.target}</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form 
                            layout="inline"
                            fluid 
                            onChange={this.formChange}
                            formValue={this.state.formData}
                            >
                            <FormGroup>
                                <ControlLabel style={{paddingRight: "20px"}}>Set Video Block</ControlLabel>
                                <FormControl 
                                    accepter={Rate}
                                    max={5}
                                    defaultValue={0}
                                    character={square}
                                    name="block"
                                    label="Block"
                                />
                                <HelpBlock>*Required, (0 = all blocks)</HelpBlock>
                            </FormGroup>
                            <hr />
                            <FormGroup>
                                <ControlLabel style={{paddingRight: "10px"}}>Set Video Series</ControlLabel>
                                <FormControl
                                    accepter={SelectPicker}
                                    name="subgroup" 
                                    placeholder="Series"
                                    
                                    
                                    data={[
                                        {
                                            "label": "running",
                                            "value": "running",
                                            "role": "Master"
                                        },
                                        {
                                            "label": "heel lowers",
                                            "value":"heel_lowers",
                                            "role": "Master"
                                        },
                                        {
                                            "label": "exit block",
                                            "value": "exit_blk",
                                            "role": "Master"
                                        },
                                        {
                                            "label": "toe pulses",
                                            "value": "toe_pulses",
                                            "role": "Master"
                                        },
                                        {
                                            "label": "side lying",
                                            "value": "side_lying",
                                            "role": "Master"
                                        },
                                        {
                                            "label":"arm lowers",
                                            "value":"arm_lowers",
                                            "role": "Master"
                                        },
                                        {
                                            "label":"hundreds",
                                            "value":"hundreds",
                                            "role": "Master"
                                        },
                                    ]}
                                />
                            </FormGroup>
                            <FormGroup>
                                    <ControlLabel style={{paddingRight: "10px"}}>Set Video Level</ControlLabel>
                                    <FormControl 
                                        accepter={CheckPicker}
                                        name='level'
                                        placeholder="Level"
                                        data={[
                                            {
                                                "label":"All levels",
                                                "value":0,
                                                "role":"Master"
                                            },
                                            {
                                                "label":"level 1",
                                                "value":1,
                                                "role":"Master"
                                            },
                                            {
                                                "label":"level 2",
                                                "value":2,
                                                "role":"Master"
                                            },
                                            {
                                                "label":"level 3",
                                                "value":3,
                                                "role":"Master"
                                            },
                                            {
                                                "label":"level 4",
                                                "value":4,
                                                "role":"Master"
                                            },
                                        ]}
                                    />
                                    <HelpBlock>*Required</HelpBlock>
                            </FormGroup>
                            <hr />
                            <FormGroup>
                                <ControlLabel style={{paddingRight: "20px"}}>Restrictions</ControlLabel>
                                <FormControl 
                                    accepter={CheckTreePicker}
                                    name="pain_settings"
                                    defaultExpandAll
                                    placeholder='Restrictions'
                                    style={{"width":"200px"}}
                                    data={[
                                        {
                                            "label": "Restrict",
                                            "value": 1,
                                            "children": [
                                                {
                                                    "label": "pregnant?",
                                                    "value": 2
                                                },
                                                {
                                                    "label": "knee pain?",
                                                    "value": 3
                                                }
                                            ]
                                        },
                                    ]}
                                />
                            </FormGroup>
                            <hr />
                            
                            <FormGroup style={{"width": "30%", "paddingLeft": "10px"}}>
                                <ControlLabel>Black Bands</ControlLabel>
                                <FormControl 
                                    style={{"width": "200px", "paddingLeft": "10px"}}
                                    accepter={Slider}
                                    name="blk_b"
                                    min={0}
                                    max={5}
                                    step={1}
                                    graduated
                                />
                            </FormGroup>
                            <FormGroup style={{"width": "30%",  "paddingLeft": "30px"}}>
                                <ControlLabel>Red Bands</ControlLabel>
                                <FormControl 
                                    style={{"width": "200px", "paddingLeft": "10px"}}
                                    accepter={Slider}
                                    name='red_b'
                                    min={0}
                                    max={5}
                                    step={1}
                                    graduated
                                />
                            </FormGroup>
                            <hr />
                            <FormGroup >
                                <ControlLabel style={{paddingRight: "20px"}}>
                                    Set Video Tags
                                </ControlLabel>
                                <FormControl 
                                    accepter={TagPicker}
                                    name='focus'
                                    placeholder="Focus"
                                    style={{width: "300px"}}
                                    data={[
                                        {
                                            "label":"cardio",
                                            "value":"cardio",
                                            "role":"Master"
                                        },
                                        {
                                            "label":"strength",
                                            "value":"strength",
                                            "role":"Master"
                                        },
                                        {
                                            "label":"slim",
                                            "value":"slim",
                                            "role":"Master"
                                        },
                                        {
                                            "label":"tone",
                                            "value":"tone",
                                            "role":"Master"
                                        },
                                        {
                                            "label":"general",
                                            "value":"general",
                                            "role":"Master"
                                        },
                                    ]}
                                />
                            </FormGroup>
                            <hr />
                            <FormGroup>
                                <ControlLabel style={{paddingRight: "20px"}}>Description</ControlLabel>
                                <FormControl
                                    name='description' 
                                    componentClass="textarea"
                                    rows={4}
                                    style={{ width: 300, resize: 'auto' }}
                                    placeholder="Description"
                                />
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.HandleSubmit} appearance="primary">
                        Confirm
                        </Button>
                        <Button onClick={this.closeModal} appearance="subtle">
                        Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
               
                <h1 className="admin-header-text">Active Videos</h1>

                <div className="admin-video-container margin-top-bottom-50 ">
                    <div className="admin-video-row ">
                        
                        
                            
                    <ul className="display_grid">{list}</ul>

  
                    </div>
                </div>


            </div>
        );
    }
}

export default AdminDashboard;