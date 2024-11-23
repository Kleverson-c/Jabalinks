package main

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"
)

var urlMap = make(map[string]urlData)

type urlData struct {
	url               string
	date              time.Time
	needsConfirmation bool
}

func enableCors(writer *http.ResponseWriter) {
	(*writer).Header().Set("Access-Control-Allow-Origin", "*")
}

func generateUUID() string {
	uuid := make([]byte, 16)
	_, error := rand.Read(uuid)
	if error != nil {
		panic(error)
	}

	return string(base64.RawURLEncoding.EncodeToString(uuid))
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /short/{key}", shortUrlHandler)
	mux.HandleFunc("POST /url", urlHandler)

	log.Fatal(http.ListenAndServe(":8080", mux))
}

func shortUrlHandler(writer http.ResponseWriter, request *http.Request) {
	urlData := urlMap[request.PathValue("key")]
	fmt.Print(urlData)
	if urlData.url == "" {
		http.Error(writer, "Page not found", http.StatusNotFound)
	}

	http.Redirect(writer, request, urlData.url, http.StatusFound)
}

func urlHandler(writer http.ResponseWriter, request *http.Request) {
	enableCors(&writer)
	url := request.FormValue("url")
	needsConfirmation, _ := strconv.ParseBool(request.FormValue("needsConfirmation"))
	hostName := request.Host

	var stringBuilder strings.Builder
	stringBuilder.WriteString(hostName)
	stringBuilder.WriteString("/short/")

	uuid := generateUUID()
	stringBuilder.WriteString(uuid)
	urlMap[uuid] = urlData{url: url, needsConfirmation: needsConfirmation, date: time.Now()}
	jsonData, error := json.Marshal(stringBuilder.String())

	if error != nil {
		http.Error(writer, "Error parsing JSON", http.StatusInternalServerError)
	}

	writer.Write(jsonData)
}
