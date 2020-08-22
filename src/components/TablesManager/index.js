import React, { Component } from 'react';
import TablesManagerView from './tablesManagerView';

class TablesManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: [],
      inputTable: {
        number: '',
        description: '',
        waitingOrder: false,
      },
      tableEdit: {
        current: '',
        newNumber: '',
        newDescription: '',
        waitingOrder: false,
      },
      showQrs: false,
      tablesQrCodes: null,
      error: { exists: false },
      displayQr: {
        src: null,
        current: null
      }
    }
  }

  componentDidMount() {
    this.setState({ tables: this.props.dbTables})
  }

  componentDidUpdate(prevProps) {
    if(this.props.dbTables !== prevProps.dbTables) {
      this.setState({ tables: this.props.dbTables });
    }
  }

  numberIsInvalid = (number) => {
    return (number <= 0) || (number === '');
  };

  // REVISAR PORQUE FUNCIONA ESTO
  tableIsDuplicate = (newNumber, currentIdx=null) => {
    if(currentIdx !== null) {
      let newTables = this.state.tables.filter((el, idx) => idx !== currentIdx);
      for(let j=0; j<newTables.length; j++) {
        if(newTables[j].number === this.state.tableEdit.newNumber) return true;
      }
    } else {
      for(let i=0; i<this.state.tables.length; i++) {
        if(this.state.tables[i].number === newNumber) return true;
      }
    }
    return false;
  }

  generateQrCodes = () => {
    let newQrs = [];
    this.state.tables.forEach(el => {
      newQrs.push({ number: el.number, qr: this.props.createQR(el.number) })
    });

    newQrs.push({ number: "takeout", qr: this.props.createQR(null, true) });
    this.setState({ tablesQrCodes: newQrs, showQrs: true });
  }

  generateSingleQr = (tableNumber, e, index, takeout=false) => {
    e.preventDefault();
    this.setState({
      displayQr: {
        src: this.props.createQR(tableNumber, takeout),
        current: index
      }
    })
  };

  editTable = (tableIdx) => {
    let newTableEdit = { 
      current: tableIdx,
      newNumber: this.state.tables[tableIdx].number,
      waitingOrder: this.state.tables[tableIdx].waitingOrder,
      newDescription: this.state.tables[tableIdx].description,
     }
    this.setState({ tableEdit: newTableEdit, displayQr: { src: null, current: null } })
  };

  resetTableEdit = () => {
    let newTableEdit = {
      current: '',
      newNumber: '',
      newDescription: '',
      waitingOrder: false,
    }
    this.setState({ tableEdit: newTableEdit, displayQr: { src: null, current: null } });
  }

  deleteTable = (deleteIndex) => {
    let newTables = [...this.state.tables].filter((el, idx) => idx !== deleteIndex);
    this.setState({ tables: newTables });
    this.resetTableEdit();
  }

  saveEditTable = (e) => {
    e.preventDefault();
    if(this.tableIsDuplicate(this.state.tableEdit.newNumber, this.state.tableEdit.current)) {
      let newError = { ...this.state.error, msg: 'ITEM NUMBER IS DUPLICATE' };
      this.setState({ error: newError });
    } else {
      let newTables = [...this.state.tables]
      newTables[this.state.tableEdit.current] = { 
        number: this.state.tableEdit.newNumber*1, 
        waitingOrder: this.state.tableEdit.waitingOrder, 
        description: this.state.tableEdit.newDescription, 
      };
      this.setState({ tables: newTables });
      this.resetTableEdit();
    }
  };

  addTable = (e) => {
    e.preventDefault();
    if(this.tableIsDuplicate(this.state.inputTable.number*1)) {
      let newError = { ...this.state.error, msg: 'ITEM NUMBER IS DUPLICATE' };
      this.setState({ error: newError });
    } else {
      if(!this.state.tables) {
        this.setState({ tables: [] });
      } else {
        let newTables = [...this.state.tables];
        let number = parseInt(this.state.inputTable.number, 10);
        newTables.push({ ...this.state.inputTable, number});
        this.setState({ 
          tables: newTables,
          inputTable: { number: '', description: '', waitingOrder: false } 
        });
      }
    }
  }

  setTableEdit = (key, value) => {
    let newTableEdit = { ...this.state.tableEdit };
    newTableEdit[key] = value;
    this.setState({ tableEdit: newTableEdit });
  }

  setInputTable = (key, value) => {
    let newInputTable = { ...this.state.inputTable };
    newInputTable[key] = value;
    this.setState({ inputTable: newInputTable });
  }

  render() {
    const { inputTable, tableEdit, tables, error, tablesQrCodes, showQrs, displayQr } = this.state;
    const inputIsInvalid = this.numberIsInvalid(inputTable.number) || inputTable.description === '';
    const editIsInvalid = this.numberIsInvalid(tableEdit.newNumber) || tableEdit.newDescription === '';
    const tablesIsEmpty = tables === 0 || tables.length === 0 ? true : false;

    return (
      <TablesManagerView 
        error={error}
        tables={this.state.tables}
        showQrs={showQrs}
        tableEdit={tableEdit}
        displayQr={displayQr}
        inputTable={inputTable}
        addTable={this.addTable}
        editTable={this.editTable}
        tablesIsEmpty={tablesIsEmpty}
        editIsInvalid={editIsInvalid}
        tablesQrCodes={tablesQrCodes}
        deleteTable={this.deleteTable}
        inputIsInvalid={inputIsInvalid}
        setTableEdit={this.setTableEdit}
        saveEditTable={this.saveEditTable}
        setInputTable={this.setInputTable}
        resetTableEdit={this.resetTableEdit}
        generateQrCodes={this.generateQrCodes}
        generateSingleQr={this.generateSingleQr}
        updateTablesDb={this.props.updateTablesDb}
        closeQrs={() => this.setState({ showQrs: false })}
      />
    )
  }
}

export default TablesManager;