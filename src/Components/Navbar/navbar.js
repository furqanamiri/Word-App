import React from "react";
import { ResponsiveNavbar } from "./responsivenavbar";
import StandardNav from "./standardnav";
import useNavbar from "./useNavbar";

export default function Navbar({
  toggleTheme,
  isDark,
  text,
  toggleViewNotes,
  setText,
  viewNotes
}) {
  const {
    toggleSaveFile,
    showFile,
    showPassword,
    handleClosePass,
    handleShowPass,
    showLoginModal,
    LoginModalOpen,
    LoginModalClose,
    LogOut,
    loginUser,
    toggleExportModalOpen,
    toggleExportModalClose,
    exportModal,
    shareModal,
    toggleShareModalOpen,
    toggleShareModalClose,
    setEdit, theme, copyFunction, noteId, pdf, wordFile
  } = useNavbar({
    toggleTheme,
    isDark,
    text,
    toggleViewNotes,
    setText
  });
  return (
    <>
      <StandardNav
        toggleSaveFile={toggleSaveFile}
        showFile={showFile}
        showPassword={showPassword}
        isDark={isDark}
        toggleTheme={toggleTheme}
        handleClosePass={handleClosePass}
        handleShowPass={handleShowPass}
        showLoginModal={showLoginModal}
        LoginModalOpen={LoginModalOpen}
        LoginModalClose={LoginModalClose}
        LogOut={LogOut}
        toggleViewNotes={toggleViewNotes}
        loginUser={loginUser}
        setEdit={setEdit}
        theme={theme}
        copyFunction={copyFunction}
        noteId={noteId} pdf={pdf}
        wordFile={wordFile}
        viewNotes={viewNotes}
      />

      <ResponsiveNavbar
        toggleTheme={toggleTheme}
        toggleSaveFile={toggleSaveFile}
        loginUser={loginUser}
        showFile={showFile}
        LoginModalOpen={LoginModalOpen}
        LogOut={LogOut}
        toggleExportModalOpen={toggleExportModalOpen}
        toggleExportModalClose={toggleExportModalClose}
        exportModal={exportModal}
        shareModal={shareModal}
        toggleShareModalOpen={toggleShareModalOpen}
        toggleShareModalClose={toggleShareModalClose}
        isDark={isDark}
        text={text}
        toggleViewNotes={toggleViewNotes}
        showPassword={showPassword}
        handleClosePass={handleClosePass}
        handleShowPass={handleShowPass}
        showLoginModal={showLoginModal}
        LoginModalClose={LoginModalClose} pdf={pdf}
        wordFile={wordFile}
        viewNotes={viewNotes}
      />
    </>
  );
}
