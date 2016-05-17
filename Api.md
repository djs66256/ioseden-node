## User

* [x]用户注册 **POST** /user

	```json
	{
		username: "xxxx",
		password: "xxxx"
	}
	```
	
	用户名为邮箱号，密码大于6位
	
	```json
	{
		code: 1,
		message: 'xxxx',
		data: {
			email: 'xxxx',
			id: 24455
		}
	}
	```

--

* [x]获取用户信息 **GET** /user(/:id)?

	id为空的时候为自己的信息

	```json
	{
		code: 1,
		message: 'xxxx',
		data: {
			email: 'xxxx',
			id: 24455
		}
	}
	```
	
* 修改密码 **PUT** /user/password
	
	```json
	{
		newPassword: 'xxxxx',
		oldPassword: 'xxxxx'
	}
	```
	
	```json
	{
		code: 1
	}
	```
	
* [x]修改用户信息 **PUT** /user

	```json
	{
		gender: 1,
		birthday: 123243
	}
	```

	```json
	{
		code: 1
	}
	```

* 上传头像 **POST** /user/avatar

* 头像地址 **GET** /user/avatar/:uuid

--

* [x]登录 **POST** /session
	
	```json
	{
		username: 'xxxx',
		password: 'xxxxx'
	}
	```

	```json
	{
		code: 1,
		data: {
			id: 24455,
			email: 'xxxx'
		}
	}
	```
	
* [x]登出 **DELETE** /session

	```json
	{
		code: 1
	}
	```
	
--	

* 创建标签 **POST** /tag

	```json
	{
		tag: 'xxxx'
	}
	```
	
	```json
	{
		code: 1,
		data: {
			id: 2342,
			tag: 'xxxx'
		}
	}
	```
	
* 关联用户标签 **POST** /user/tags

	```json
	{
		id: 2343, // user id
		tags: [
			{
				id: 235454,
			},
			{
				name: 'xxxx'
			}
		]
	}
	```
	
* 查找用户标签 **GET** /user(/:uid)/tags
* 查找用户热门标签 **GET** /user/tags/hot

	```json
	{
		code: 1,
		data: [
			{
				id: 13,
				name: 'xxx'
			}
		]
	}
	```
	
--

* 关注 **POST** /user/followee/:id


* 取消关注 **DELETE** /user/followee/:id


* 关注我/他的人 **GET** /user(/:uid)/followers
* 我/他关注的人 **GET** /user(/:uid)/followees

	```json
	{
		index: 0,
		size: 20
	}
	```

	```json
	{
		code: 1,
		data: {
			count: 100,
			list: [
				{
					id: 3,
					nickname: 'aa',
					gender: 2
				},
				{
					id: 3,
					nickname: 'aa',
					gender: 2
				}
			]
		}
	}
	```
