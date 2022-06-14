import { Component } from 'react'
import Joi from 'joi-browser'
import Input from './input'
import Select from './select';

export default class Form extends Component {
  state = {
    data: {},
    errors: {}
  };
  validate = () => {
    const options = { abortEarly: false }
    const { error } = Joi.validate(this.state.data, this.schema, options)
    // const result = Joi.validate(this.state.data, this.schema, options)
    // console.log(result);
    
    if(!error) return null

    const errors = {};
    // map array into an object
    for (let item of error.details)
      errors[item.path[0]] = item.message;
    return errors;
  }

  validateProperty = input =>{
    const { name, value } = input
    // computed properties ie dynamic assignment
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema )
    return error? error.details[0].message : null;
  }

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors:errors || {} });
    if(errors) return;

    this.doSubmit();
  }

  handleChange = ({currentTarget:input}) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if(errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name]
    
    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({data, errors })
  }

  renderButton(label){
    return (
      <button 
        className='btn btn-primary' 
        disabled={this.validate()} // if true disable
      >
        {label}
      </button>
    )
  }

  renderInput(name, label, type ){
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        type={type}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    )
  }

  renderSelect(name, label, options ){
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    )
  }
}
