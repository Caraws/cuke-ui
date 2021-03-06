import React, { PureComponent, createRef } from "react";
import PropTypes from "prop-types";
import cls from "classnames";
import Input from "../input";
import { DownIcon } from "../icon";

export default class Select extends PureComponent {
  state = {
    selectedValue: this.props.defaultValue || this.props.value || "",
    visible: null
  };
  static defaultProps = {
    prefixCls: "cuke-select",
    onPanelVisibleChange: () => {},
    onChange: () => {}
  };
  static propTypes = {
    prefixCls: PropTypes.string.isRequired,
    onPanelVisibleChange: PropTypes.func,
    onChange: PropTypes.func,
    overlay: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
      PropTypes.object
    ])
  };
  constructor(props) {
    super(props);
    this.timeOutId = null;
    this.toggleContainer = createRef();
  }

  onChange = value => {
    this.setState({ selectedValue: value, visible: false });
    this.props.onChange(value);
    this.props.onPanelVisibleChange(false);
  };
  onClickHandler = () => {
    const visible = !this.state.visible;
    this.setState({
      visible
    });
    this.props.onPanelVisibleChange(visible);
  };
  onClickOutsideHandler = e => {
    e.stopPropagation();
    if (
      this.state.visible &&
      !this.toggleContainer.current.contains(e.target)
    ) {
      this.setState({ visible: false });
      this.props.onPanelVisibleChange(false);
    }
  };
  render() {
    const { visible } = this.state;
    const {
      prefixCls,
      className,
      disabled,
      placeholder,
      children,
      onPanelVisibleChange, //eslint-disable-line
      ...attr
    } = this.props;

    const { selectedValue } = this.state;

    return (
      <div
        className={cls(`${prefixCls}`, className)}
        {...attr}
        ref={this.toggleContainer}
      >
        <div
          className={cls(`${prefixCls}-inner`, {
            [`${prefixCls}-active`]: visible
          })}
        >
          <Input
            disabled={disabled}
            readonly
            placeholder={placeholder}
            className={cls(`${prefixCls}-input`)}
            value={selectedValue}
            onClick={this.onClickHandler}
          />
          <DownIcon className={`${prefixCls}-arrow`} />
        </div>
        <div
          className={cls(`${prefixCls}-content`, {
            [`${prefixCls}-open`]: visible,
            [`${prefixCls}-close`]: !visible,
            ["cuke-ui-no-animate"]: visible === null
          })}
        >
          {React.Children.map(children, (element, index) => {
            return React.cloneElement(element, {
              key: index,
              selectedValue,
              onChange: this.onChange
            });
          })}
        </div>
      </div>
    );
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.onClickOutsideHandler, false);
  }
  componentDidMount() {
    window.addEventListener("click", this.onClickOutsideHandler, false);
  }
}
