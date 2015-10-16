var pics = [
	"one.jpg",
	"two.jpg",
	"three.jpg",
	"four.jpg",
	"five.jpg"
];

var SliderModel = Backbone.Model.extend({
	initialize: function() {
		this.cacheUrlImg();
	},
	cacheUrlImg: function() {
		var res = pics.map(function(item) {
			return "<img src='img/" + item + "'/>";
		});
		this.set("imgs", res);
		this.set("active", 0);
	}
});
//var SliderCollection = Backbone.Collection.extend({
//	model: SliderModel
//});
var m = new SliderModel();
var SliderView = Backbone.View.extend({
	el: ".main_container",
	events: {
		"click .btn_prev" : "clickPrev",
		"click .btn_next" : "clickNext"
	},
	clickPrev: function() {
		var currentPos = ~~this.model.get("active");
		currentPos -= 1;
		if(currentPos < 0) currentPos = this.model.get("imgs").length;
		this.model.set("active", currentPos);
	},
	clickNext: function() {
		var currentPos = ~~this.model.get("active");
		currentPos += 1;
		if(currentPos > this.model.get("imgs").length) currentPos = 0;
		this.model.set("active", currentPos);
	},
	initialize: function() {
		this.listenTo(this.model, "change:active", this.render);
		this.render();
	},
	render: function() {
		var index = this.model.get("active");
		var currImg = this.model.get("imgs");
		var place = this.$el.find(".slde_place");
		place.html(currImg[index]);
		return this;
	}
});
var slider = new SliderView({
	model: m
});