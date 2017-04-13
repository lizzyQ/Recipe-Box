"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ReactBootstrap = ReactBootstrap;
var Button = _ReactBootstrap.Button;
var ButtonGroup = _ReactBootstrap.ButtonGroup;
var InputGroup = _ReactBootstrap.InputGroup;
var DropdownButton = _ReactBootstrap.DropdownButton;
var MenuItem = _ReactBootstrap.MenuItem;
var ButtonToolbar = _ReactBootstrap.ButtonToolbar;
var Glyphicon = _ReactBootstrap.Glyphicon;
var Collapse = _ReactBootstrap.Collapse;
var Well = _ReactBootstrap.Well;
var ListGroup = _ReactBootstrap.ListGroup;
var ListGroupItem = _ReactBootstrap.ListGroupItem;
var Modal = _ReactBootstrap.Modal;
var FormGroup = _ReactBootstrap.FormGroup;
var FormControl = _ReactBootstrap.FormControl;
var ControlLabel = _ReactBootstrap.ControlLabel;
var Accordion = _ReactBootstrap.Accordion;
var Panel = _ReactBootstrap.Panel;

var colorpalette = ["rgb(212,71,90)", "rgb(183,220,186)", "rgb(111,188,154)", "rgb(248,226,150)", "rgb(123,137,120)"];

var ModalBox = function (_React$Component) {
  _inherits(ModalBox, _React$Component);

  function ModalBox(props) {
    _classCallCheck(this, ModalBox);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      show: false,
      newRecipe: {},
      editedRecipe: {}
    };
    return _this;
  }

  ModalBox.prototype.addItem = function addItem(e) {
    var inputTitle = ReactDOM.findDOMNode(this.refs.titleAdd).value;
    var inputContents = ReactDOM.findDOMNode(this.refs.contentsAdd).value;
    if (inputTitle == '') {
      alert('Title is required');
    } else if (inputContents == '') {
      alert('Ingredient is required');
    } else {
      inputContents = inputContents.split(',');
      this.setState({
        newRecipe: {
          user: 'newUser',
          title: inputTitle,
          ingredients: inputContents
        }
      }, function () {
        this.props.addNew(this.state.newRecipe);
      });
    }
    e.preventDefault();
  };

  ModalBox.prototype.editItem = function editItem(e) {
    var editTitle = ReactDOM.findDOMNode(this.refs.titleEdit).value;
    var editContents = ReactDOM.findDOMNode(this.refs.contentsEdit).value;
    if (editTitle == '') {
      alert('Title is required');
    } else if (editContents == '') {
      alert('Ingredient is required');
    } else {
      editContents = editContents.split(',');
      this.setState({
        editedRecipe: {
          user: 'newUser',
          title: editTitle,
          ingredients: editContents
        }
      }, function () {
        this.props.onEdit(this.state.editedRecipe);
      });
    }
    e.preventDefault();
  };

  ModalBox.prototype.render = function render() {
    var _this2 = this;

    var close = function close() {
      return _this2.setState({ show: false });
    };
    return React.createElement(
      "div",
      { className: "modal-container" },
      this.props.role == "add" ? React.createElement(
        Button,
        { bsStyle: "primary",
          bsSize: "large",
          block: true,
          onClick: function onClick() {
            return _this2.setState({ show: true });
          } },
        "Add Recipe"
      ) : React.createElement(
        Button,
        { bsStyle: "info",
          bsSize: "medium",
          onClick: function onClick() {
            return _this2.setState({ show: true });
          } },
        React.createElement(Glyphicon, { glyph: "pencil" })
      ),
      React.createElement(
        Modal,
        { show: this.state.show,
          onHide: close,
          container: this,
          "aria-labelledby": "contained-modal-title" },
        React.createElement(
          Modal.Header,
          { closeButton: true },
          React.createElement(
            Modal.Title,
            { id: "contained-modal-title" },
            this.props.role == "add" ? 'Add Recipe' : 'Edit Recipe'
          )
        ),
        React.createElement(
          "form",
          {
            onSubmit: this.props.role == "add" ? this.addItem.bind(this) : this.editItem.bind(this) },
          React.createElement(
            Modal.Body,
            null,
            React.createElement(
              FormGroup,
              { controlId: "rcpTitle" },
              React.createElement(
                ControlLabel,
                null,
                "Title"
              ),
              this.props.role == "add" ? React.createElement(FormControl, { type: "text",
                placeholder: "Recipe Name",
                ref: "titleAdd" }) : React.createElement(FormControl, { type: "text",
                defaultValue: this.props.recipeItem.title,
                ref: "titleEdit" })
            ),
            React.createElement(
              FormGroup,
              { controlId: "rcpContent" },
              React.createElement(
                ControlLabel,
                null,
                "Ingredients"
              ),
              this.props.role == "add" ? React.createElement(FormControl, { componentClass: "textarea",
                placeholder: "Enter recipe, Seperate , By, Comma",
                ref: "contentsAdd" }) : React.createElement(FormControl, { type: "textarea",
                defaultValue: this.props.recipeItem.ingredients,
                ref: "contentsEdit" })
            )
          ),
          React.createElement(
            Modal.Footer,
            null,
            React.createElement(
              Button,
              { bsStyle: "success", onClick: close, type: "submit", block: true },
              "Done"
            )
          )
        )
      )
    );
  };

  return ModalBox;
}(React.Component);

var Recipes = function (_React$Component2) {
  _inherits(Recipes, _React$Component2);

  function Recipes() {
    _classCallCheck(this, Recipes);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Recipes.prototype.deleteRcp = function deleteRcp(idx) {
    this.props.onDelete(idx);
  };

  Recipes.prototype.editRcp = function editRcp(item, itemIdx) {
    this.props.onEdit(item, itemIdx);
  };

  Recipes.prototype.render = function render() {
    var _this4 = this;

    var recipes = undefined;

    if (this.props.recipes) {
      recipes = this.props.recipes.map(function (recipe, idx) {
        var pos = Math.floor(Math.random() * 4);
        var color = { background: colorpalette[pos] };
        var title = React.createElement(
          "h3",
          { className: "text-capitalize", style: color },
          recipe.title
        );

        return React.createElement(
          Panel,
          { header: title, eventKey: idx },
          React.createElement(
            "h5",
            null,
            "Ingredients"
          ),
          React.createElement(RecipeItem, { key: idx, recipe: recipe.ingredients }),
          React.createElement(
            ButtonToolbar,
            null,
            React.createElement(
              Button,
              { bsStyle: "danger", bsSize: "medium",
                onClick: _this4.deleteRcp.bind(_this4, idx) },
              React.createElement(Glyphicon, { glyph: "trash" })
            ),
            React.createElement(ModalBox, { role: "edit", recipeItem: recipe, onEdit: _this4.editRcp.bind(_this4, idx) })
          )
        );
      });
    }

    return React.createElement(
      Accordion,
      null,
      recipes
    );
  };

  return Recipes;
}(React.Component);

var RecipeItem = function (_React$Component3) {
  _inherits(RecipeItem, _React$Component3);

  function RecipeItem() {
    _classCallCheck(this, RecipeItem);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  RecipeItem.prototype.render = function render() {
    var recipeItems = undefined;

    if (this.props.recipe) {
      recipeItems = this.props.recipe.map(function (item, idx) {
        return React.createElement(
          ListGroupItem,
          null,
          item
        );
      });
    }

    return React.createElement(
      ListGroup,
      null,
      recipeItems
    );
  };

  return RecipeItem;
}(React.Component);

var sampleRecipe = [{
  user: 'admin',
  title: 'Rose Pizza',
  ingredients: ['3 cups flour', '1 tsp yeast', ' a pintch salt', '3 bell pepper']
}, {
  user: 'admin',
  title: 'Apple Pie',
  ingredients: ['5 apples', '1 pie', '1 tbsp salt', '2 tsp sugar']
}, {
  user: 'admin',
  title: 'soup',
  ingredients: ['water', 'tomato', 'potato']
}];

var App = function (_React$Component4) {
  _inherits(App, _React$Component4);

  function App(props) {
    _classCallCheck(this, App);

    var _this6 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

    _this6.state = {
      recipes: []
    };
    return _this6;
  }

  App.prototype.componentDidMount = function componentDidMount() {

    var storedData = localStorage._liz_recipes;
    /* 
    no data in local storage, just render samples 
    and update the samples into local storage
    */
    if (JSON.parse(storedData).length == 0) {
      this.setState({ recipes: sampleRecipe });
    } else {
      this.setState({ recipes: JSON.parse(storedData) });
    }
  };

  App.prototype.handleNew = function handleNew(recipe) {
    var recipes = this.state.recipes;
    recipes.push(recipe);
    this.setState({ recipes: recipes });
  };

  App.prototype.handleDelete = function handleDelete(idx) {
    var recipes = this.state.recipes;
    recipes.splice(idx, 1);
    this.setState({ recipes: recipes });
  };

  App.prototype.handleEdit = function handleEdit(itemIdx, item) {
    var recipes = this.state.recipes;
    recipes.splice(itemIdx, 1, item);
    this.setState({ recipes: recipes });
  };

  App.prototype.componentDidUpdate = function componentDidUpdate() {
    localStorage.setItem('_liz_recipes', JSON.stringify(this.state.recipes));
  };

  App.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h2",
        { className: "text-center" },
        "Lazy Recipe"
      ),
      React.createElement(Recipes, { recipes: this.state.recipes,
        onDelete: this.handleDelete.bind(this),
        onEdit: this.handleEdit.bind(this) }),
      React.createElement(ModalBox, { role: "add", addNew: this.handleNew.bind(this) })
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("recipeBox"));