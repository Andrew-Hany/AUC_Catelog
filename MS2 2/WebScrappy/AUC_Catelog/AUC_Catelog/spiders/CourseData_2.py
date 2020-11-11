import scrapy
from ..items import ToturialItem
import re


class Course(scrapy.Spider):
    name = "course2"
    start_urls = [
        "http://catalog.aucegypt.edu/content.php?filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=1&cur_cat_oid=36&expand=1&navoid=1738&print=1#acalog_template_course_filter"
    ]

    def parse(self, response):
        # items = ToturialItem()

        description = response.css('.width li ::text, strong::text').getall()
        # for d in description:
        #
        #     ds = d.get()
        #
        #     # items['description'] = description
        #     if not re.findall('\s(\s)', ds):
        yield {'description': description}
        next_page = response.css("td > span+a::attr(href)").get()
        if next_page is not None:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse)
