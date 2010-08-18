PREFIX = .

BUILD_DIR = ${PREFIX}/build
DOCS_DIR = ${PREFIX}/docs
DIST_DIR = ${PREFIX}/dist

SRC_DIR = ${PREFIX}/src

BASE_FILES = ${SRC_DIR}/core.js\
	${SRC_DIR}/objectExtend.js\
	${SRC_DIR}/ajax.js\
	${SRC_DIR}/json.js\
	${SRC_DIR}/comet.js\
	${SRC_DIR}/cookie.js\
	${SRC_DIR}/log.js\
	${SRC_DIR}/webim.js\
	${SRC_DIR}/setting.js\
	${SRC_DIR}/status.js\
	${SRC_DIR}/buddy.js\
	${SRC_DIR}/room.js\
	${SRC_DIR}/history.js \


WEBIM_FILES = ${SRC_DIR}/intro.js\
	${BASE_FILES}\
	${SRC_DIR}/outro.js

WEBIM_VER = `cat ${PREFIX}/version.txt`
DATE=`git log -n 1 | grep Date: | sed 's/Date:   //g'`
COMMIT=`git log -n 1 | grep commit | sed 's/commit //g'`


REPLACE = sed 's/Date:./&'"${DATE}"'/' | \
		sed 's/Commit:./&'"${COMMIT}"'/' | \
		sed s/@VERSION/${WEBIM_VER}/

#REPLACE = sed s/@VERSION/${WEBIM_VER}/

MINJAR = java -jar ${BUILD_DIR}/yuicompressor-2.4.2.jar
UNICODE = native2ascii -encoding utf-8 

WEBIM_JS = ${DIST_DIR}/webim.js

WEBIM_MIN_JS = ${DIST_DIR}/webim.min.js

all: dist min
	@@echo "webim build complete."

dist:
	@@mkdir -p ${DIST_DIR}

	@@cat ${WEBIM_FILES} | \
		${REPLACE} > ${WEBIM_JS};

	@@echo "Merge"
	@@echo ${WEBIM_JS}

min:
	@@echo "Building"
	@@echo " - Compressing"

	@@${MINJAR} --type js ${WEBIM_JS} > ${WEBIM_MIN_JS}
	@@echo ${WEBIM_MIN_JS}

clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}

