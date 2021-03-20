from django.contrib import admin
from .models import *
# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display=['uid', 'first_name','last_name','email']
    search_fields=['first_name','last_name','email']
    list_filter=['first_name','last_name','email']

class TriviaStoreAdmin(admin.ModelAdmin):
    list_display=['tid', 'cid','question','option1','option2', 'option3', 'option4', 'answer', 'likes', 'dislikes', 'displayed']
    search_fields=['tid', 'cid','question','option1','option2', 'option3', 'option4', 'answer', 'likes', 'dislikes', 'displayed']
    list_filter=['cid', 'likes', 'dislikes', 'displayed']

class ClusterAdmin(admin.ModelAdmin):
    list_display=['cid', 'cname']
    search_fields=['cid', 'cname']
    list_filter=['cid', 'cname']

class ScoreAdmin(admin.ModelAdmin):
    list_display=['sid', 'uid','cid','score']
    search_fields=['sid', 'uid','cid','score']
    list_filter=['sid', 'uid','cid','score']


admin.site.register(UserOfApp,UserAdmin)
admin.site.register(TriviaStore,TriviaStoreAdmin)
admin.site.register(Cluster,ClusterAdmin)
admin.site.register(Score,ScoreAdmin)
admin.site.site_header = "SelfRefresh Admin"
admin.site.site_title = "SelfRefresh Admin Page"
admin.site.index_title = "SelfRefresh Admin Page"
