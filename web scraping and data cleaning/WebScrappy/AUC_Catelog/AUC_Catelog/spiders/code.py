import scrapy
import re
from ..items import ToturialItem


class QuotesSpider(scrapy.Spider):
    name = "code"

    start_urls = [
        "http://catalog.aucegypt.edu/content.php?catoid=36&catoid=36&navoid=1738&filter%5Bitem_type%5D=3&filter"
        "%5Bonly_active%5D=1&filter%5B3%5D=1&filter%5Bcpage%5D=1#acalog_template_course_filter "
    ]

    def parse(self, response):
        code = response.css('select option::text')
        i = 0
        j = 0
        for c in code:
            if re.findall('^([A-Z]+)[A-Z]', c.get()):
                if not re.findall('(/)', c.get()):
                    co = c.get()
                    yield {'code':co}

