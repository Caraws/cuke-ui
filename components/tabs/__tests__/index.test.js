import assert from "power-assert";
import React from "react";
import { render, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Tabs from "../index";

import { SuccessIcon, ErrorIcon } from "../../icon";

describe("<Tabs/>", () => {
  it("should render Tabs", () => {
    const wrapper = render(
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="选项1" key="1">
          1
        </Tabs.TabPane>
        <Tabs.TabPane tab="选项2" key="2">
          2
        </Tabs.TabPane>
        <Tabs.TabPane tab="选项3" key="3">
          3
        </Tabs.TabPane>
      </Tabs>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render custom active key", () => {
    const wrapper = render(
      <Tabs defaultActiveKey="2">
        <Tabs.TabPane tab="选项1" key="1">
          1
        </Tabs.TabPane>
        <Tabs.TabPane tab="选项2" key="2">
          2
        </Tabs.TabPane>
        <Tabs.TabPane tab="选项3" key="3">
          3
        </Tabs.TabPane>
      </Tabs>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render custom tab title", () => {
    const wrapper = shallow(
      <Tabs defaultActiveKey="2">
        <Tabs.TabPane tab={<SuccessIcon />} key="1">
          1
        </Tabs.TabPane>
        <Tabs.TabPane tab={<ErrorIcon />} key="2">
          2
        </Tabs.TabPane>
      </Tabs>
    );
    assert(wrapper.find(SuccessIcon).length === 1);
    assert(wrapper.find(ErrorIcon).length === 1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should find cuke-tabs classnames", () => {
    const wrapper = shallow(
      <Tabs defaultActiveKey="2">
        <Tabs.TabPane tab="选项1" key="1">
          1
        </Tabs.TabPane>
        <Tabs.TabPane tab="选项2" key="2">
          2
        </Tabs.TabPane>
        <Tabs.TabPane tab="选项3" key="3">
          3
        </Tabs.TabPane>
      </Tabs>
    );
    assert(wrapper.find(".cuke-tabs").length === 1);
    assert(wrapper.find(".cuke-tabs-header").length === 1);
    assert(wrapper.find(".cuke-tabs-content").length === 1);
    assert(wrapper.find(".cuke-tabs-line").length === 1);
  });

  it("should render disabled tab", () => {
    const wrapper = render(
      <Tabs defaultActiveKey="2">
        <Tabs.TabPane tab="选项1" key="1">
          1
        </Tabs.TabPane>
        <Tabs.TabPane tab="选项2" disabled key="2">
          2
        </Tabs.TabPane>
        <Tabs.TabPane tab="选项3" key="3">
          3
        </Tabs.TabPane>
      </Tabs>
    );
    assert(wrapper.find(".cuke-tabs-tab-disabled").length === 1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should can trigger onChange event", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Tabs defaultActiveKey="2" onChange={onChange} type="card">
        <Tabs.TabPane tab="选项1" key="1">
          1
        </Tabs.TabPane>
        <Tabs.TabPane tab="选项2" disabled key="2">
          2
        </Tabs.TabPane>
        <Tabs.TabPane tab="选项3" key="3">
          3
        </Tabs.TabPane>
      </Tabs>
    );
    wrapper
      .find(".cuke-tabs-tab")
      .at(0)
      .simulate("click");
    expect(onChange).toHaveBeenCalled();
  });

  it("should can not trigger onChange event when every tab disabled", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Tabs defaultActiveKey="2" onChange={onChange} type="card">
        <Tabs.TabPane tab="选项1" disabled key="1">
          1
        </Tabs.TabPane>
        <Tabs.TabPane tab="选项2" disabled key="2">
          2
        </Tabs.TabPane>
        <Tabs.TabPane tab="选项3" disabled key="3">
          3
        </Tabs.TabPane>
      </Tabs>
    );
    wrapper
      .find(".cuke-tabs-tab")
      .at(0)
      .simulate("click");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("should find new activeKey when component update", () => {
    const wrapper = shallow(
      <Tabs activeKey="2" type="card">
        <Tabs.TabPane tab="选项1" disabled key="1">
          1
        </Tabs.TabPane>
        <Tabs.TabPane tab="选项2" disabled key="2">
          2
        </Tabs.TabPane>
        <Tabs.TabPane tab="选项3" disabled key="3">
          3
        </Tabs.TabPane>
      </Tabs>
    );
    wrapper.setProps({
      activeKey: "3"
    });
    expect(wrapper.state().activeKey).toEqual(3);
  });
});
