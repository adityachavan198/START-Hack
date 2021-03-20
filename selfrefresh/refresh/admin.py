from django.contrib import admin
from .models import *
# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display=['first_name','last_name','email']
    search_fields=['first_name','last_name','email']

class TriviaStoreAdmin(admin.ModelAdmin):
    list_display=['tid', 'cid','question','option1','option2', 'option3', 'option4', 'answer', 'likes', 'displayed']
    search_fields=['tid', 'cid','question','option1','option2', 'option3', 'option4', 'answer', 'likes', 'displayed']


admin.site.register(UserOfApp,UserAdmin)
admin.site.register(TriviaStore,TriviaStoreAdmin)
