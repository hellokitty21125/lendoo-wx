// 导出模块
module.exports = {
  dateFormat: function (objects) {
		objects.map(function (item, index) {
			item.updatedAt = item.updatedAt.toLocaleDateString();
			item.createdAt = item.createdAt.toLocaleDateString();
			console.log(item);
			return item;
		});
		return objects;
	}
}
