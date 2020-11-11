import scrapy
import re
from ..items import ToturialItem


class QuotesSpider(scrapy.Spider):
    name = "quotes"

    start_urls = [
        "http://catalog.aucegypt.edu/content.php?catoid=36&catoid=36&navoid=1738&filter%5Bitem_type%5D=3&filter"
        "%5Bonly_active%5D=1&filter%5B3%5D=1&filter%5Bcpage%5D=1#acalog_template_course_filter "
    ]

    def parse(self, response):
        items = ToturialItem()

        major = response.css('p strong::text').getall()
        courses = response.css('.width a::text').getall()
        page_number = response.css('.width a::text')

        items['major'] = major
        items['courses'] = courses
        # items['credits'] = page_number
        yield items

        next_page = response.css("span+ a::attr(href)").get()
        if next_page is not None:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse)

# ------------not important for now------------#
# def parse(self, response):
#     items = ToturialItem()
#     major = response.css('strong::text').getall()
#     # courses =q.css('.author::text').extract()
#     # tag  =q.css('.tag::text').extract()
#     items['title'] = major
#     # items['author'] = author
#     # items['tag'] = tag
#     yield items
