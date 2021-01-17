import scrapy
from ..items import ToturialItem


class Course(scrapy.Spider):
    name = "course"
    page_number = 81619
    start_urls = [
        "http://catalog.aucegypt.edu/content.php?filter%5B27%5D=-1&filter%5B29%5D=&filter%5Bcourse_type%5D=2981"
        "&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=1&cur_cat_oid=36&expand=1&navoid=1738&print=1"
        "#acalog_template_course_filter "
    ]

    def parse(self, response):
        # items = ToturialItem()
        if (response.xpath(
                '//td[contains(concat( " ", @class, " " ), concat( " ", "coursepadding", " " ))]/div[2]//text()')):
            description = response.xpath(
                '//td[contains(concat( " ", @class, " " ), concat( " ", "coursepadding", " " ))]/div[2]//text()').getall()
        else:
            description = response.css(
                '.social-media-ajax+ div ::text').getall()
        # items['description'] = description
        yield {'description': description}

        next_page = "http://catalog.aucegypt.edu/ajax/preview_course.php?catoid=36&coid=" + str(
            Course.page_number) + \
                    "&link_text" \
                    "=&display_options=a:2:{" \
                    "s:8:~location~;s:8:~template~;s:28:~course_program_display_field~;N;}&show#"
        # some pages are not real pages
        if (Course.page_number == 82217) | (Course.page_number == 82757) | (Course.page_number == 82810) | \
                (Course.page_number == 82835) | (Course.page_number == 83419)|(Course.page_number == 82857):
            Course.page_number = Course.page_number + 2
            yield scrapy.Request(next_page, callback=self.parse)
        elif (Course.page_number == 82489) | (Course.page_number == 83367):
            Course.page_number = Course.page_number + 3
            yield scrapy.Request(next_page, callback=self.parse)
        if Course.page_number <= 84009:
            Course.page_number = Course.page_number + 1
            yield scrapy.Request(next_page, callback=self.parse)
