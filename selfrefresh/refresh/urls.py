from django.urls import path
from . import views
from django.conf.urls import url

urlpatterns = [
    # path("index", views.index,name="index"),
    path("fetchtrivia", views.fetchtrivia, name="fetchtrivia"),
    path("saveresponse", views.saveresponse, name="saveresponse"),
]
