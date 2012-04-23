from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'statsapp.views.home', name='home'),
    # url(r'^statsapp/', include('statsapp.foo.urls')),
    url(r'^submit/', 'datasaver.views.submit'),
    url(r'^leaderboard/$', 'datasaver.views.leaderboard'),
    url(r'^leaderboard/(?P<guid>\d*)/$', 'datasaver.views.leaderboard'),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
