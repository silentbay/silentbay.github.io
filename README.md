# SilentBay Sources

Search tags based on [Alex Pearce's search script](http://alexpearce.me/2012/04/simple-jekyll-searching/)

CSS [Twitter Bootstrap](https://github.com/twbs/bootstrap)

Share icons based on [Share42](http://share42.com)

# Usage

**Head image:** insert `headimg: "link to image"` into `post.md` 850x150 px.

**Comments:** insert Disqus script into `/include/comments.html`.

**Images:** into `post.md` use `{% include img.html link="link to image" thumb="link to thumbnail" %}`.

Use `/include/footer.html` for your counter.

# Post archive

Insert `{% include archive.html param="year" %}` into `/archive/index.html`

    		<div class="col-md-9">
			<div class="panel panel-default">
				<div class="hidden-xs panel-heading" style="height: 150px; background-image: url('/data/archive.jpg')"></div>
				<div class="panel-body">
					{% include archive.html param="2015" %}
					{% include archive.html param="2014" %}
					{% include archive.html param="2013" %}
					{% include archive.html param="2012" %}
					{% include archive.html param="2011" %}
					{% include archive.html param="2010" %}
				</div>
				<div class="panel-footer"></div>
			</div>
		</div>
