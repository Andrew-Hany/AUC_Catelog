# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ToturialItem(scrapy.Item):
    # define the fields for your item here like:
    description = scrapy.Field()
    courses = scrapy.Field()
    major = scrapy.Field()
    majors=scrapy.Field()
    code =scrapy.Field()
    # credits = scrapy.Field()
