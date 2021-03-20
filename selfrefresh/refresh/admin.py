from django.contrib import admin
from .models import *
# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display=['uid', 'first_name','last_name','email']
    search_fields=['first_name','last_name','email']

class TriviaStoreAdmin(admin.ModelAdmin):
    list_display=['tid', 'cid','question','option1','option2', 'option3', 'option4', 'answer', 'likes', 'displayed']
    search_fields=['tid', 'cid','question','option1','option2', 'option3', 'option4', 'answer', 'likes', 'displayed']

class ClusterAdmin(admin.ModelAdmin):
    list_display=['cid', 'cname']
    search_fields=['cid', 'cname']

class ScoreAdmin(admin.ModelAdmin):
    list_display=['sid', 'uid','cid','score']
    search_fields=['sid', 'uid','cid','score']


admin.site.register(UserOfApp,UserAdmin)
admin.site.register(TriviaStore,TriviaStoreAdmin)
admin.site.register(Cluster,ClusterAdmin)
admin.site.register(Score,ScoreAdmin)
