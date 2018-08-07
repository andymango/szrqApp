import { Dimensions } from "react-native";
export default (width, height, backgroundColor) => {
    return {
        modalContainer: {
            backgroundColor,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden"
        },
        watchOrigin: {
            position: "absolute",
            width,
            bottom: 20,
            justifyContent: "center",
            alignItems: "center"
        },
        watchOriginTouchable: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5,
            borderRadius: 30,
            borderColor: "white",
            borderWidth: 0.5,
            backgroundColor: "rgba(0, 0, 0, 0.1)"
        },
        watchOriginText: {
            color: "white",
            backgroundColor: "transparent"
        },
        imageStyle: {},
        container: {
            backgroundColor
        },
        // 多图浏览需要调整整体位置的盒子
        moveBox: {
            flexDirection: "row",
            alignItems: "center"
        },
        menuContainer: {
            position: "absolute",
            width,
            height,
            left: 0,
            bottom: 0
        },
        menuShadow: {
            position: "absolute",
            width,
            height,
            backgroundColor: "black",
            left: 0,
            bottom: 0,
            opacity: 0.2,
            zIndex: 10
        },
        menuContent: {
            position: "absolute",
            width,
            left: 0,
            bottom: 0,
            zIndex: 11
        },
        operateContainer: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            height: 40,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1
        },
        operateText: {
            color: "#333"
        },
        loadingTouchable: {
            width,
            height
        },
        loadingContainer: {
            justifyContent: "center",
            alignItems: "center"
        },
        arrowLeftContainer: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            justifyContent: "center"
        },
        arrowRightContainer: {
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            justifyContent: "center"
        }
    };
};
export const simpleStyle = {
	count: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 38,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent"
	},
	countText: {
		color: "white",
		fontSize: 16,
		backgroundColor: "transparent",
		textShadowColor: "rgba(0, 0, 0, 0.3)",
		textShadowOffset: {
				width: 0,
				height: 0.5
		},
		textShadowRadius: 0
	},
	defaultHeaderBox: {
		position: "absolute",
		left: 0,
		right: 0,
		backgroundColor: "rgba(0, 0, 0, 0.3)",
	},
	defaultHeaderLeft: {
		width: 55,
		height: 45,
	},
	defaultHeaderLeftBox: {
		width: 55,
		height: 45,
		alignItems: "center",
		flexDirection: "row",
		justifyContent:'center',
	},
	defaultHeaderContent: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent:'center',
	},
	defaultHeaderContentText: {
		color: "#fff",
		fontSize: 16,
	},
	defaultTitleBox: {
		position: "absolute",
		top: 55,
		left: 15
	}
};