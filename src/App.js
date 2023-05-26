
import './App.css';
import {v4 as uuidv4} from 'uuid';
import { Component } from 'react';
import React from 'react';


const list = [
  {
    user: 'ASdasd',
    surname: 'fasdf',
    floor: 'Male',
    DOB: '12.01.1999',
    objectID: 0,
  },
  ];


  const isSerched = searchTerm => item =>
  item.user.toLowerCase().includes(searchTerm.toLowerCase());

  
class App extends Component {

  constructor(props) {
    super(props);
    this.state ={
      list,
      searchTerm: '',
      user: '',
      surname: '',
      floor: '',
      DOB: '',
    }
    this.onDismiss = this.onDismiss.bind(this)
    this.onSerchChange = this.onSerchChange.bind(this);
    
  }  
  

  onDismiss(id){
    const isNotId = item => item.objectID !== id;
    const updateList = this.state.list.filter(isNotId);
    this.setState({list:updateList});
  }

  onSerchChange(event){
    this.setState({ searchTerm: event.target.value});
  }

  handleChange = (event) => {
    const input = event.target;
    const value = input.value;
 
    this.setState({ [input.name]: value });

  };
 
  handleFormSubmit = () => {
    const {user, surname, floor, DOB} = this.state;

    localStorage.setItem('key', uuidv4());
    localStorage.setItem('user', user);
    localStorage.setItem('surname', surname);
    localStorage.setItem('floor', floor);
    localStorage.setItem('DOB', DOB);
  };

  componentDidMount = () => {
    const newItem = {
      user : localStorage.getItem('user'),
      surname : localStorage.getItem('surname'),
      floor : localStorage.getItem('floor'),
      DOB : localStorage.getItem('DOB'),
      objectID : localStorage.getItem('key'),
    };
  this.setState({list: [...this.state.list, newItem]});
  };

render() {
  const{ 
    searchTerm, 
    list,
    user,
    surname,
    floor,
    DOB,
  } = this.state;
  return (
    <div className="page">
      <div className="interactions">
        <Search 
          value={searchTerm}
          onChange= {this.onSerchChange}
        >
          Поиск по имени
        </Search>
      </div>
      <Table 
        list={list}
        pattern={searchTerm}
        onDismiss={this.onDismiss}
      >

      </Table>

      <Adding
        user ={user}
        surname={surname}
        floor={floor}
        DOB={DOB}
        onHandle = {this.handleFormSubmit}
        Handle = {this.handleChange}
        Compon = {this.componentDidMount}
      />
      
    </div>
  );
};
}

function Search({value, onChange, children}) {
    return (
      <form>
        {children}
        <input type="text"
        value={value}
        onChange={onChange}
        />
      </form>
    );
}

const Table = ({list, pattern, onDismiss}) =>
      <div className="table">
        {list.filter(isSerched(pattern)).map(item =>
          <div key={item.objectID} className="table-row">
            <span style={{ width: '30%' }}> 
              {item.user} 
            </span>
            <span style={{ width: '30%' }}> 
              {item.surname}
            </span>
            <span style={{ width: '10%' }}> 
              {item.floor} 
            </span>
            <span style={{ width: '10%' }}> 
              {item.DOB} 
            </span>
            <span>
              
            </span>
            <span style={{ width: '10%' }}> 
              <Button onClick={() => onDismiss(item.objectID)}
                className="button-inline"
              >
                Отбросить
              </Button>
            </span>
          </div>
        )}  
      </div>   

const Adding = ({user, surname, floor, DOB, onHandle, Handle, Compon}) =>
          <form onSubmit={onHandle}>
            <label>
              Имя: <input name="user" value={user} onChange={Handle}/>
            </label>
            <label>
              Фамилия: <input name="surname" value={surname} onChange={Handle}/>
            </label>
            <label>
              Пол: <input name="floor" value={floor} onChange={Handle}/>
            </label>
            <label>
              Дата рождения: <input type='data' name="DOB" value={DOB} onChange={Handle}/>
            </label>
            <button onChange={Compon} type="submit">Добавить</button>
          </form>
          

function Button(props) {
    const {
      onClick,
      className = '',
      children,
    } = props;
    return (
      <button
      onClick = {onClick}
      className = {className}
      type="button"
      >
      {children}
      </button>
    );  
}


export default App;
