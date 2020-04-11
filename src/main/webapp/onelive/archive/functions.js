let nextPageToken = null;
let fetchedItemCount = 0;

function loadYoutubeVideos() {
    let url = "https://sef-dataholder.herokuapp.com/youtube/onelive?maxResults=12";
    if (nextPageToken != null){
        url = url + "&nextPageToken=" + nextPageToken;
    }
    $.ajax({
        type: 'get',
        url: url,
        dataType: 'json',
        success: function (data) {
            fetchedItemCount = fetchedItemCount + data.items.length;
            if(fetchedItemCount === data.pageInfo.totalResults){
                $("#btnLoadMore").hide();
            }
            nextPageToken = data.nextPageToken;
            // Slice if the description if it is very long
            data.items.forEach((item) => {
                const snippet = item.snippet;
                if (snippet.description.length > 100) {
                    snippet.description = snippet.description.slice(0, 80) + "...";
                }
            });
            // Mustache render
            let renderedHtmlContent = Mustache.render(
                $('#template-youtube-videos').html(), {items: data.items});
            $('#youtube-videos').append(renderedHtmlContent);
        }
    });
}
