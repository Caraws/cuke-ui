import React from 'react';
import { storiesOf } from '@storybook/react';

import WordPadPage from './pages/wordPad';
import RadioPage from './pages/radio';
import CheckboxPage from './pages/checkbox';
import Input from '../components/input';
import Switch from '../components/switch';
import { withInfo } from '@storybook/addon-info';
import { IoIosAddCircleOutline } from 'react-icons/io';

import '../components/input/styles.less';
import '../components/radio/styles.less';
import '../components/checkbox/styles.less';
import './styles/dataEntry.less';

storiesOf('数据录入', module)
	.add(
		'WordPad 写字板',
		withInfo(`
	import React, { Component } from 'react';
	import WordPad from '../../components/wordPad';
	import Button from '../../components/button';
	import message from '../../components/message';

	export default class WordPadPage extends Component { 
		state = {
			imgUrl:""
		}
		onGetImage = ()=>{
			const img = this.canvas.toDataURL('image/png')
			console.log('获取成功:',img)
			this.setState({
				imgUrl:img
			})
			message.success('获取成功')
		}
		render(){ 
			const { imgUrl } = this.state
			return (
				<div>
				<h2>用鼠标在上面写字</h2>
				<WordPad
					width={300}
					height={300}
					style={{
						border: '1px solid #444',
						margin: '10px 0'
					}}
	s				getCanvas={(canvas, ctx) => this.canvas = canvas}
				/>
				<Button type="primary" onClick={this.onGetImage}>获取文字</Button>
				{
					imgUrl ? <img src={imgUrl}/> : undefined
				}
				</div>
			)
		}
	}
	`)(() => <WordPadPage />)
	)
	.add(
		'Input 输入框',
		withInfo()(() => (
			<div style={{ width: 400 }}>
				<h2>基本使用</h2>
				<Input
					placeholder="请输入"
					onChange={e => console.log(e.target.value)}
				/>
				<Input
					type="password"
					placeholder="请输入密码"
					style={{ margin: '10px 0' }}
				/>
				<Input type="number" placeholder="请输入数字" />
				<Input
					placeholder="请输入"
					defaultValue="默认值"
					style={{ margin: '10px 0' }}
				/>
				<Input readonly value="只读" style={{ marginBottom: 10 }} />
				<Input disabled placeholder="禁用" />

				<h2>前置/后置标签</h2>
				<Input addonBefore={<IoIosAddCircleOutline />} placeholder="请输入" />
				<Input
					addonAfter={'.com'}
					placeholder="填写网址"
					style={{ margin: '10px 0' }}
				/>
				<Input
					addonBefore={'https://'}
					addonAfter={'.cn'}
					placeholder="www.lijinke"
				/>
			</div>
		))
	)
	.add(
		'Radio 单选框',
		withInfo(`
	<div>
	<h2>基本使用</h2>
	<Radio value="黄瓜 ui" onChange={this.onChange}>
		黄瓜 ui
	</Radio>{' '}
	<br />
	<Radio defaultChecked={true}>默认选中</Radio> <br />
	<h2>禁用</h2>
	<Radio disabled>黄瓜 ui</Radio> <br />
	<Radio checked disabled>
		黄瓜 ui
	</Radio>
	<h2>老板需要几号技师</h2>
	<p> 选中 : {this.state.value} </p>
	<Radio.Group value={this.state.value} onChange={this.onChange}>
		<Radio value="小红">小红</Radio>
		<Radio value="小明">小明</Radio>
		<Radio value="小美">小美</Radio>
		<Radio value="小芳">小芳</Radio>
		<Radio value="小黑" disabled>
			小黑
		</Radio>
	</Radio.Group>
</div>
`)(() => <RadioPage />), { notes: "test" }
	)
	.add(
		'Checkbox 复选框',
		withInfo()(() => <CheckboxPage />)
	)
	.add(
		'Switch 开关',
		withInfo()(() => (
			<div>
				<h2>基本使用</h2>
				<Switch onChange={(checked)=> console.log('checked',checked)}/>

				<h2>描述文字</h2>
				<Switch checkedChildren="♂" unCheckedChildren="♀"/>
				<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked/>

				<h2>默认选中</h2>
				<Switch defaultChecked/>

				<h2>禁用</h2>
				<Switch checkedChildren="开" unCheckedChildren="关" disabled/>
				<Switch defaultChecked disabled/>

				<h2>加载中</h2>
				<Switch checkedChildren="开" unCheckedChildren="关" loading/>
				<Switch defaultChecked loading/>

				<h2>三种大小</h2>
				<Switch defaultChecked size="large"/>
				<Switch defaultChecked size="default"/>
				<Switch defaultChecked size="small"/>
			</div>
		))
	);
